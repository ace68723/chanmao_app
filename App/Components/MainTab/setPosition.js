setPosition(){

  if(_scrollY != this.state.scrollY._value ){

     if(this.state.scrollY._value<=200){

         _scrollY = this.state.scrollY._value;

         _forEach(this.scrollViewRefs,(ref,index)=>{
           if(ref.index != this.state.currentTab){
             this.scrollViewRefs[ref.index].scrollView.scrollTo({y: this.state.scrollY._value,animated:false});
           }
         })

     }else {
       _forEach(this.scrollViewRefs,(ref,index)=>{
         if(ref.index != this.state.currentTab){
           this.scrollViewRefs[ref.index].scrollViewContent.measure((ox, oy, width, height, px, py) => {
             if(py>40 ){
               this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});
             }
            });
         }
       })
     }
  }



  // if(this.state.scrollY._value<268){
  // 	_forEach(this.scrollViewRefs,(ref,index)=>{
  // 					this.scrollViewRefs[ref.index].scrollView.scrollTo({y: this.state.scrollY._value,animated:false});
  // 	})
  // }else{
  // 	_forEach(this.scrollViewRefs,(ref,index)=>{
  // 		if(ref.index != this.state.currentTab){
  // 					this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});
  // 		}
  // 		this.scrollViewRefs[ref.index].scrollViewContent.measure((ox, oy, width, height, px, py) => {
  // 			console.log(ox, oy, width, height, px, py)
  // 		})
  // 	})
  // }



  // if(this.state.scrollY._value<200){
  // 		console.log('scrollY value')
  // 	 _forEach(this.scrollViewRefs,(ref,index)=>{
  // 		//  if(ref.index != this.state.currentTab){
  // 			 this.scrollViewRefs[ref.index].scrollView.scrollTo({y: this.state.scrollY._value,animated:false});
  // 			 if(ref.index != undefined && this.state.scrollY._value){
  // 		 			realm.write(() => {
  // 		 				realm.create('ScrollView',{viewIndex:ref.index,position:this.state.scrollY._value}, true );
  // 		 			})
  // 				//  realm.create('ScrollView',{viewIndex:ref.index,position:this.state.scrollY._value}, true );
  // 			 }
  //
  // 		//  }
  // 	 })
  // 	// })
  // }else{
  // 	// realm.write(() => {
  // 		_forEach(this.scrollViewRefs,(ref,index)=>{
  // 			if(ref.index != this.state.currentTab){
  // 				const position = realm.objectForPrimaryKey('ScrollView',ref.index).position;
  // 				if(position<200){
  //
  // 						this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});
  //
  // 						if(ref.index != undefined){
  // 							realm.write(() => {
  // 				 				realm.create('ScrollView',{viewIndex:ref.index,position:200}, true );
  // 				 			})
  // 						}
  // 						// realm.create('ScrollView',{viewIndex:ref.index,position:200}, true );
  // 				}
  //
  // 			}
  // 		})
  // 	// })
  // }









  // console.table([{"_scrollY != this.state.scrollY._value ":_scrollY != this.state.scrollY._value},
  // 							 {"this.state.scrollY._value<=200":this.state.scrollY._value<=200},
  // 							])
  // if(_scrollY != this.state.scrollY._value ){
  //
  //    if(this.state.scrollY._value<=200){
  //
  // 		 if(!this.showBanner){
  // 			 this.showBanner = true
  // 			 _scrollY = this.state.scrollY._value;
  //
  // 			 _forEach(this.scrollViewRefs,(ref,index)=>{
  // 				 if(ref.index != this.state.currentTab){
  // 					 this.scrollViewRefs[ref.index].scrollView.scrollTo({y: this.state.scrollY._value,animated:false});
  // 				 }
  // 			 })
  // 		 }
  //
  //    }else {
  // 		//  console.log(this.showBanner)
  // 		 if(this.showBanner){
  // 			 this.showBanner = false
  // 			 _forEach(this.scrollViewRefs,(ref,index)=>{
  // 				//  console.log("ref.index != this.state.currentTab:",ref.index != this.state.currentTab)
  // 				 if(ref.index != this.state.currentTab){
  // 				  this.scrollViewRefs[ref.index].scrollViewContent.measure((ox, oy, width, height, px, py) => {
  // 				      this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});
  // 				   });
  // 				 }
  // 			 })
  // 		 }
  // 		//  if(showBanner)
  // 		//  console.log(this.scrollViewRefs)
  // 		// console.log("scroll")
  //     //  _forEach(this.scrollViewRefs,(ref,index)=>{
  // 		// 	 console.log(this.scrollViewRefs[ref.index].scrollView)
  // 		// 	//  console.table([{"ref.index != this.state.currentTab":ref.index != this.state.currentTab}])
  //     //    if(ref.index != this.state.currentTab){
  // 		// 		const handle = findNodeHandle(this.scrollViewRefs[ref.index].scrollViewContent);
  // 		// 		UIManager.measure(
  // 		// 		  handle,
  // 		// 		  (x, y, w, h, px, py) => {
  // 		// 		    console.log('offset', ref.index,x, y, w, h, px, py);
  // 		// 		  });
  //         //  this.scrollViewRefs[ref.index].scrollViewContent.measure((ox, oy, width, height, px, py) => {
  //         //    console.log(ref.index,py)
  // 				// 	if(ref.index==0){
  // 				// 		console.log(py,oy)
  // 				// 	}
  //         //   //  if(py>40 ){
  //         //   //    this.scrollViewRefs[ref.index].scrollView.scrollTo({y: 200,animated:false});
  //         //   //  }
  //         //   });
  //
  //       //  }
  //     //  })
  //     //  _forEach(this.scrollViewRefs,(ref,index)=>{
  //     //    this.scrollViewRefs[ref.index].scrollView.measure((ox, oy, width, height, px, py) => {
  //     //      console.log(py)
  //     //     });
  //     //  })
  //
  //    }
  // }
}
