import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let articleState = {};
let aritcleauthorState = {};
let broadcastauthorState = {};
let artivityAuthorState = {};
let joinUsState = {};
let WebState = {};
let CommentListState = {};
let TheSixState = {};
const TheSixStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT);
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback);
	},
  getAticleList(data){
    articleState = Object.assign(articleState,{
			 articleList:data.articleList,
		});
  },
  getArticleAuthor(data){
    aritcleauthorState = Object.assign(aritcleauthorState,{
			 articleAuthorList:data.articleAuthorList,
		});
  },
	getBroadcastAuthor(data){
		broadcastauthorState = Object.assign(broadcastauthorState,{
			 broadcastAuthorList:data.broadcastAuthorList,
		});
	},
	getActivityAuthor(data){
		artivityAuthorState = Object.assign(artivityAuthorState,{
			 activityAuthorList:data.activityAuthorList,
		});
	},
	submitApplication(data){
		joinUsState.submitResult = data.result;
	},
	submitComment(resData){
		if(resData.view === 'web'){
			WebState = Object.assign(WebState,{
				 submitResult:resData.result,
			});
		}else if(resData.view === 'comment'){
			CommentListState = Object.assign(CommentListState,{
				 submitResult:resData.result,
			});
		}

	},
	getCommentAmount(commentAmount){
		WebState = Object.assign(WebState,{
			commentAmount:commentAmount,
		})
	},
	getCommentList(resData){
		CommentListState = Object.assign(CommentListState,{
			 commentList:resData.commentList,
		});
	},
	checkUpdate(resData){
		TheSixState = Object.assign({},resData);
	},
  getArticleState(){
    return articleState
  },
  getAritcleauthorState(){
		aritcleauthorState.newArticle = TheSixStore.getNewArticle();
	  return aritcleauthorState
  },
	getBroadcastauthorState(){
		broadcastauthorState.newBroadcast = TheSixStore.getNewBroadcast();
		return broadcastauthorState
	},
	getActivityAuthorState(){
		artivityAuthorState.newActivity = TheSixStore.getNewActivity();
		return artivityAuthorState
	},
	getJoinUsState(){
		return joinUsState
	},
	WebState(){
		return WebState
	},
	getCommentListState(){
		return CommentListState
	},
	getTheSixState(){
		return TheSixState
	},
	getNewArticle(){
		return TheSixState.newArticle
	},
	getNewBroadcast(){
		return TheSixState.newBroadcast
	},
	getNewActivity(){
		return TheSixState.newActivity
	},
	initJoinUsState(){
			joinUsState = Object.assign({},{
				 submitResult:null,
				 comment:'',
			});
	},
	initWebState(){
			WebState = Object.assign({},{
				 submitResult:null,
				//  comment:'',
			});
	},
	initCommentListState(){
		CommentListState = Object.assign({},{
			 submitResult:null,
			//  comment:'',
		});
	},


	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.GET_ATICLE_LIST:
              TheSixStore.getAticleList(action.data);
							TheSixStore.emitChange();
					break;
        case AppConstants.GET_ARTICLE_AUTHOR:
              TheSixStore.getArticleAuthor(action.data);
  						TheSixStore.emitChange();
  				break;
				case AppConstants.GET_BROADCAST_AUTHOR:
	            TheSixStore.getBroadcastAuthor(action.data);
							TheSixStore.emitChange();
					break;
				case AppConstants.GET_ACTIVITY_AUTHOR:
	            TheSixStore.getActivityAuthor(action.data);
							TheSixStore.emitChange();
					break;
				case AppConstants.SUBMIT_APPLICATION:
	            TheSixStore.submitApplication(action.data);
							TheSixStore.emitChange();
					break;
				case AppConstants.SUBMIT_COMMENT:
	            TheSixStore.submitComment(action.resData);
							TheSixStore.emitChange();
					break;
				case AppConstants.GET_COMMENT_AMOUNT:
							TheSixStore.getCommentAmount(action.commentAmount);
							TheSixStore.emitChange();
					break;
				case AppConstants.GET_COMMENT_LIST:
							TheSixStore.getCommentList(action.resData);
							TheSixStore.emitChange();
					break;
				case AppConstants.CHECK_UPDATE:
							TheSixStore.checkUpdate(action.resData);
							TheSixStore.emitChange();
					break;


		  }

	})

});
module.exports = TheSixStore;
