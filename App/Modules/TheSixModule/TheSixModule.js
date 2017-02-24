'use strict';
const  TheSixApi = require( './TheSixApi');
import AuthStore from '../AuthModule/AuthStore';
import moment from 'moment';
const  TheSixModule = {
  async getAticleList(reqData){
      try{
        const data = await TheSixApi.getAticleList(reqData)
        let eo_data = {};
        if(data.result === 0){
          const result = data.result;
          let articleList = [];
          data.post_list.map((article)=>{
                const title       = article.title;
                const url         = article.content_url;
                const image       = article.icon_url;
                const description = article.summary;
                const date        = moment.unix(article.created_at).format("MMMM Do YY");
                const id          = article.id
                articleList = [...articleList,{title,url,image,description,date,id}]
             })
          eo_data = {result,articleList};
        }else{
        }

        return eo_data
      }catch (e){
      }
  },
  async getArticleAuthor(token){
      try{
        const data = await TheSixApi.getArticleAuthor(token)
        let eo_data = {};
        if(data.result === 0){
          const result = data.result;
          let articleAuthorList = [];
            data.authors.map((author)=>{
              articleAuthorList = [...articleAuthorList,author]
            })
          eo_data = {result,articleAuthorList};
        }else{
        }

        return eo_data
      }catch (e){
      }
  },
  async getBroadcastAuthor(token){
      try{
        const data = await TheSixApi.getBroadcastAuthor(token)
        let eo_data = {};
        if(data.result === 0){
          const result = data.result;
          let broadcastAuthorList = [];
            data.authors.map((author)=>{
              broadcastAuthorList = [...broadcastAuthorList,author]
            })
          eo_data = {result,broadcastAuthorList};
        }else{
        }

        return eo_data
      }catch (e){
      }
  },
  async getActivityAuthor(token){
      try{
        const data = await TheSixApi.getActivityAuthor(token)
        let eo_data = {};
        if(data.result === 0){
          const result = data.result;
          let activityAuthorList = [];
            data.authors.map((author)=>{
              activityAuthorList = [...activityAuthorList,author]
            })
          eo_data = {result,activityAuthorList};
        }else{
        }

        return eo_data
      }catch (e){
      }
  },
  async submitApplication(io_data){
        try{
          const token = io_data.token;
          const category = io_data.category;
          const content = io_data.content;
          const reqData = {category,content};
          const resData = await TheSixApi.submitApplication(token,reqData);
          let eo_data = {};
          if(resData.result === 0){
            eo_data.result = resData.result;
          }else{
          }

          return eo_data
        }catch (e){
        }
    },
    async submitComment(io_data){
      try{
        const token = io_data.token;
        const pid = io_data.pid;
        const comment = io_data.comment;
        const reqData = {pid,comment};
        const resData = await TheSixApi.submitComment(token,reqData);
        let eo_data = {};
        if(resData.result === 0){
          eo_data.result = resData.result;
        }else{
        }

        return eo_data
      }catch (e){
      }
    },
    async getCommentList(io_data){
      try{
        const token = io_data.token;
        const pid = io_data.pid;
        const reqData = {pid};
        const resData = await TheSixApi.getCommentList(token,reqData);
        let eo_data = {};
        if(resData.result === 0){
            let commentList = [];
            resData.comment_list.map((lo_comment)=>{
                const comment_id           = lo_comment.id;
                const comment_pid          = lo_comment.pid;
                const comment_follow_id     = lo_comment.follow_id;
                const comment_name          = lo_comment.name;
                const comment               = lo_comment.comment;
                const comment_created_at    = moment.unix(lo_comment.created_at).toNow();
                const comment_created_by    = lo_comment.created_by;
                const comment_approved_at   = lo_comment.approved_at;
                const comment_approved_by   = lo_comment.approved_by;
                const comment_status       = lo_comment.status;
                const comment_avatar       = lo_comment.avatar;

                commentList = [...commentList,
                                {   comment_id,
                                    comment_pid,
                                    comment_follow_id,
                                    comment_name,
                                    comment,
                                    comment_created_at,
                                    comment_created_by,
                                    comment_approved_at,
                                    comment_approved_by,
                                    comment_status,
                                    comment_avatar,
                                  }
                               ]
             });
             eo_data.result = resData.result;
             eo_data.commentList = commentList;
             eo_data.commentAmount = commentList.length;
        }else{
        }
        return eo_data
      }catch (e){
      }
    },
    async checkUpdate(token){
      // await AuthStore.removeData(['TheSixUpdateTime','TheSixPosts'])
      const LocalStoreData = await AuthStore.getData(['TheSixUpdateTime','TheSixPosts']);
      let last_update = LocalStoreData.TheSixUpdateTime;
      let la_TheSixPosts = [];
      if(!last_update){
        last_update = 0;
      }
      const reqData = {last_update};
      const resData = await TheSixApi.checkUpdate(token,reqData);
      if(resData.result === 0){
        if(last_update === 0){
          // ===============================
          //    doesn't have local posts
          // ===============================
          const saveData = [
            ['TheSixUpdateTime',JSON.stringify(resData.last_check)],
            ['TheSixPosts',JSON.stringify(resData.posts)]
          ];
          await AuthStore.saveData(saveData);
          la_TheSixPosts = resData.posts;
        }else if(resData.posts.length > 0){
          // ==================================
          //    have local posts but need update
          // ==================================
          la_TheSixPosts = JSON.parse(LocalStoreData.TheSixPosts)
          resData.posts.forEach(post => {
            const index = la_TheSixPosts.findIndex(lo_post => {
                return lo_post.author_id === post.author_id
            })
            if(index === -1){
              la_TheSixPosts = [...la_TheSixPosts,post];
            }else{
              la_TheSixPosts[index].amount += post.amount;
            }
          })
          const saveData = [
            ['TheSixUpdateTime',JSON.stringify(resData.last_check)],
            ['TheSixPosts',JSON.stringify(la_TheSixPosts)]
          ];
          await AuthStore.saveData(saveData);
        }else{
          // =====================================
          //   have local posts and no need update
          // =====================================
          const LocalStoreData = await AuthStore.getData(['TheSixPosts']);
          la_TheSixPosts = JSON.parse(LocalStoreData.TheSixPosts);

        }
        // =====================================
        //  check category update
        // =====================================
        let updateArticle = null;
        let updateBroadcast = null;
        let updateActivity = null;
        let newArticle = [];
        let newBroadcast = [];
        let newActivitys = [];
        la_TheSixPosts.forEach(post => {
          if(post.team == 'A'){
            updateArticle = true;
            const author_id = post.author_id;
            const amount = post.amount;
            newArticle = [...newArticle,{author_id,amount}]
          }
          if(post.team == 'R'){
            updateBroadcast = true;
            const author_id = post.author_id;
            const amount = post.amount;
            newBroadcast = [...newBroadcast,{author_id,amount}]
          }
          if(post.team == 'T'){
            updateActivity = true;
            const author_id = post.author_id;
            const amount = post.amount;
            newActivitys = [...newActivitys,{author_id,amount}]
          }
        });
        const eo_data = {updateArticle,updateBroadcast,updateActivity,la_TheSixPosts,newArticle,newBroadcast,newActivitys};
        // local store check
        // const TestCheck = await AuthStore.getData(['TheSixUpdateTime','TheSixPosts']);
        return eo_data

      }

    },
    async removeUpdate(author_id){
      const LocalStoreData = await AuthStore.getData(['TheSixPosts']);
      let la_TheSixPosts = JSON.parse(LocalStoreData.TheSixPosts);
      la_TheSixPosts.map((post,index) => {
        if(post.author_id == author_id){
          la_TheSixPosts.splice(index, 1);
        }
      })
      const saveData = [
        ['TheSixPosts',JSON.stringify(la_TheSixPosts)]
      ];
      await AuthStore.saveData(saveData);
    }

}
module.exports = TheSixModule;
