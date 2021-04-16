window.addEventListener("load",initEvents);
var audio_1;
var playbtn;
var stopbtn;
var input;
var current_time;
var total_time;
var frwdbtn;
var helperFrwd;
function initEvents(){
    // initilize Events---------------------
    audio_1 = document.querySelector("#audio_tag");
    audio_2 = document.querySelector("#audio_tag2");
    section2 = document.querySelector("#section_2");
    playlistSong = document.querySelector("#playlist_section");
    loadsongs();
    loadPlaylist();
    playbtn = document.querySelector("#playbtn");
    stopbtn = document.querySelector("#stopbtn");
    frwdbtn = document.querySelector("#frwdbtn");
    backbtn = document.querySelector("#backbtn");
    stopbtn.addEventListener('click',stopsong);
    playbtn.addEventListener('click',controlbtn);
    frwdbtn.addEventListener('click',forward);
    backbtn.addEventListener('click',backward);
    playbtn.disabled=true;
    stopbtn.disabled=true;
    backbtn.disabled=true;
    frwdbtn.disabled=true;

    // Find from index.html
    b_btn = document.querySelector("#bbtn");
    f_btn = document.querySelector("#fbtn");
    s_btn = document.querySelector("#sbtn");
    p_btn = document.querySelector("#pbtn");   
    // put event on it
    b_btn.addEventListener('click',back_button);
    p_btn.addEventListener('click',play_button);
    f_btn.addEventListener('click',forward_button);
    s_btn.addEventListener('click',stop_button);
    // mark disable
    b_btn.disabled=true;
    p_btn.disabled=true;
    s_btn.disabled=true;
    f_btn.disabled=true;

    
    
}
var play_btn;
var add_btn;
function loadsongs(){
    songs.forEach(function(obj){
        var ul = document.querySelector("#all_songs");
        var li = document.createElement('li');
        var div = document.createElement('div');
        var img_box  = document.createElement('div');
        var h5 = document.createElement('h5');
        var img = document.createElement('img');
        add_btn = document.createElement('button');
        play_btn = document.createElement('button');
        div.className = 'img-div';
        add_btn.className = 'btn btn-danger';
        play_btn.className = 'btn btn-danger';
        img_box.className = 'img-box';
        play_btn.addEventListener('click',playsong);
        add_btn.addEventListener('click',add_to_playList);
        // play_btn.setAttribute('title')
        img.src = obj.song_img;
        h5.innerHTML = obj.song_name;
        add_btn.innerHTML = '<i class="fas fa-plus">';
        play_btn.innerHTML = 'Play';
        // play_btn.id = obj.song_id;
        add_btn.setAttribute('title',obj.song_id);
        play_btn.setAttribute('title',obj.song_id)
        div.appendChild(img);
        img_box.appendChild(div);
        li.appendChild(img_box);
        li.appendChild(h5);
        li.appendChild(add_btn);
        li.appendChild(play_btn);
        
        ul.appendChild(li);
    })
}
function playsong(){
    // console.log("song is playing");
    section2.style.display='block';
    playlistSong.style.display='none';
    playbtn.disabled=false;
    stopbtn.disabled=false;
    backbtn.disabled=false;
    frwdbtn.disabled=false;
    var btn_id=this.title;
    var flag = false;
    for(var i = 0; i < songs.length; i++){
        if(btn_id == songs[i].song_id){
            flag = true;
            audio_1.src = songs[i].song_url;
            helperFrwd = songs[i].song_id;
            helperbcwrd = songs[i].song_id;
            helperF();
            helperB();
            break;
        }
    }
    
    if(flag==true){
        audio_1.play();
        audio_2.src="";
        playbtn.innerHTML ='<i class="fas fa-pause">';
        // setInterval(function(){
        //     input.value=(audio_1.currentTime/audio_1.duration)*100;
        //     // total_time.innerHTML = audio_1.duration;
        //     // current_time.innerHTML = audio_1.currentTime;
        // },100);
    }

}
// ----------------------

var ctrlflag=true;
function controlbtn(){
    // work
    if(ctrlflag){
        audio_1.pause();
        playbtn.innerHTML ='<i class="fas fa-play">';
        ctrlflag=false;
    }
    else{
        audio_1.play();
        playbtn.innerHTML ='<i class="fas fa-pause">';
        ctrlflag=true;
    }
}

function stopsong(){
    audio_1.pause();
    audio_1.currentTime=0;
    playbtn.innerHTML='<i class="fas fa-play">';
    ctrlflag=false;
}

var song_obj;
var icon_btn ;
// playlist_song.addsong(song_obj.song_id , song_obj.song_name , song_obj.song_url , song_obj.song_img );
//         showPlaylist();
//         song_obj.present_status = 'true';
function add_to_playList(){
    // console.log("function: called");
     var song_id = this.title;
     for(var i = 0; i < songs.length; i++){
         if(song_id == songs[i].song_id){
             song_obj = songs[i];
             break;
         }
     }
     isPresent='false';
     if(song_obj.present_status == 'false'){
        for(var i = 0; i < playlist_song.my_play_list.length; i++){
            if(this.title == playlist_song.my_play_list[i].id){
                isPresent='true';
                break;
            }
        }
        if(isPresent =='false'){
           playlist_song.addsong(song_obj.song_id , song_obj.song_name , song_obj.song_url , song_obj.song_img );
           showPlaylist();
           song_obj.present_status = 'true';
        }else{
            alert("oops , you cant't add it again !! this song is alredy in your playlist ")
            return;
        }
     }
     else{
         alert("This song exist in your playlist")
         return;
     }
    
    // confirm(song_obj.song_name+"is added to your playlist");
}
function showPlaylist(){
    var ul_tag = document.querySelector("#playlist");
    ul_tag.innerHTML="";
    playlist_song.my_play_list.forEach(function(obj){
        var song_img = obj.img;
        var song_name = obj.name;
        var song_id = obj.id;
        var li = document.createElement('li');
        var img_div = document.createElement('div');
        var img = document.createElement('img');
        var h4 = document.createElement('h4');
        icon_btn = document.createElement('button');
        play_btn = document.createElement('button');
        play_btn.className = 'btn btn-danger';
        play_btn.innerHTML = '<i class="fas fa-play">';
        play_btn.addEventListener("click",PPsong);
        play_btn.id = obj.id;
        img.src = song_img;
        img_div.className="img-div";
        img_div.appendChild(img);
        icon_btn.className = 'icon';
        icon_btn.innerHTML='<i class="fas fa-trash">';
        icon_btn.addEventListener('click',dlt);
        icon_btn.id = song_id;
        h4.innerHTML = song_name;
        li.appendChild(img_div);
        li.appendChild(h4);
        li.appendChild(play_btn);
        li.appendChild(icon_btn);

        ul_tag.appendChild(li);
    // console.log("function-called");
    });
   savePlaylist();
}
function dlt(){
    var songObj;
    // console.log("dlt-function-called");
     var song_id = this.id;
     for(var i = 0; i < songs.length; i++){
        if(song_id == songs[i].song_id){
            songObj = songs[i];
            break;
        }
     }
     var con = confirm("You want to remove : "+songObj.song_name+" from your playlist");
     if(con){
        playlist_song.delete(song_id);
        showPlaylist();
        songObj.present_status = 'false';
        audio_2.src="";
        p_btn.disabled=true;
        s_btn.disabled=true;
        f_btn.disabled=true;
        b_btn.disabled=true;
        p_btn.innerHTML='<i class="fas fa-play">';
        p_btn.style.color='white';
        alert("You deleted this song : "+songObj.song_name) 
    }else{
         alert("Okay")        
     }
     
 }


// --------------FORWRD-BUTTON----------------------
var frwdidx;
function helperF(){
    // console.log(helperFrwd);
    frwdidx = helperFrwd-1;
    if(frwdidx+1<songs.length){
        frwdidx=frwdidx+1;
        frwdbtn.disabled=false;
        // console.log(j);
    }else{
        frwdbtn.disabled=true;
    }
}
function forward(){
  console.log("forward")
  playbtn.innerHTML ='<i class="fas fa-pause">';
  ctrlflag=true;
   for(var i = 0; i < songs.length; i++){
       if(frwdidx+1==songs[i].song_id){
        audio_1.src = songs[i].song_url;
        // songs[i].style.border="1px solid #fff";
        audio_1.play();
        frwdselfhelp();
        helperbcwrd=songs[i].song_id;
        helperB();
        break;
       }
   }
     
}
function frwdselfhelp(){
    if(frwdidx+1<songs.length){
        frwdidx=frwdidx+1;
    }else{
        frwdbtn.disabled=true;
    }
}
// ---------------------FORWRD-BUTTON-WORK-END------------------------

var bcwrdidx;
function helperB(){
    bcwrdidx = helperbcwrd - 1;
    if(bcwrdidx - 1 >= 0){
        bcwrdidx = bcwrdidx - 1;
        backbtn.disabled = false;
    } else{
        backbtn.disabled = true;
    }
}
function backward(){
    playbtn.innerHTML ='<i class="fas fa-pause">';
    ctrlflag=true;
     for(var i =0; i < songs.length; i++){
         if(bcwrdidx+1 == songs[i].song_id){
            audio_1.src = songs[i].song_url;
            audio_1.play();
            bcwrdselfhelp();
            helperFrwd=songs[i].song_id
            helperF();
            break;
         }
     }
}
function bcwrdselfhelp(){
    if(bcwrdidx - 1 >= 0){
        bcwrdidx = bcwrdidx - 1;
    }else{
        backbtn.disabled = true;
    }
}
// -------------------------------------------------------------------
function savePlaylist(){
    // console.log("saveplaylist function-called");
    if(window.localStorage){
        var data = JSON.stringify(playlist_song.my_play_list);
        localStorage.setItem('data',data);
    }else{
        alert("Locale Storage Not supported");
    }
}

function loadPlaylist(){
    if(window.localStorage){
         if(localStorage.data){
             var data = localStorage.getItem('data');
             playlist_song.my_play_list = JSON.parse(data);
             showPlaylist();
         }
    }
    else{
        alert("local storage not supported");
    }
}
function seekSong(){
    audio_1.currentTime = input.value / 100 * audio_1.duration;
}

// =========================================================================
function PPsong(){
    // console.log("playlist song play");
    // console.log(this.id);
    // section2.style.display='none';
    playlistSong.style.display='block'
    b_btn.disabled=false;
    p_btn.disabled=false;
    s_btn.disabled=false;
    f_btn.disabled=false;

    var flag = false;
    for(var i = 0; i < playlist_song.my_play_list.length; i++ ){
        if(this.id == playlist_song.my_play_list[i].id){
            var song_obj = playlist_song.my_play_list[i];
            // console.log("name of song : "+song_obj.name+" ||  url of song : "+song_obj.url);
            // console.log(i);
            audio_2.src = song_obj.url;
            f_idx=i;
            b_idx=i;
            f_idx_help();
            b_idx_help();
            flag= true;
            break;
        }
    }
    if(flag){
        audio_1.src="";
        audio_2.play();
        p_btn.innerHTML ='<i class="fas fa-pause">';
    }

}
var play_flag=true;
function play_button(){
    // console.log("playbtn called")
    if(play_flag){
        audio_2.pause();
        p_btn.innerHTML ='<i class="fas fa-play">';
        play_flag=false;
    }else{
        audio_2.play();
        p_btn.innerHTML ='<i class="fas fa-pause">';
        play_flag=true;
    }

}
function stop_button(){
    // console.log("stopbtn called")
    audio_2.pause();
    audio_2.currentTime=0;
    p_btn.innerHTML='<i class="fas fa-play">';
    play_flag=false
}

// ------------------
var fidx;
function f_idx_help(){
  fidx = f_idx;
  if(fidx+1<playlist_song.my_play_list.length){
      fidx = fidx + 1;
      f_btn.disabled=false;
  }else{
      f_btn.disabled=true;
  }
}

function forward_button(){
    // console.log("forwardbtn called")
    p_btn.innerHTML='<i class="fas fa-pause">';
    play_flag=true;
    for(var i = 0; i < playlist_song.my_play_list.length; i++){
        if(fidx==i){
            audio_2.src = playlist_song.my_play_list[i].url;
            audio_2.play();
            forward_selfhelp();
            b_idx=i;
            b_idx_help();
            break;
        }
    }
}

function forward_selfhelp(){
    if(fidx+1<playlist_song.my_play_list.length){
        fidx=fidx+1;
    }else{
        f_btn.disabled=true;
    }
}

var bidx;
function b_idx_help(){
    bidx = b_idx;
    if(bidx-1>=0){
        bidx = bidx-1;
        b_btn.disabled=false;
    }else{
        b_btn.disabled=true;
    }
}
function back_button(){
    // console.log("backbtn called")
    p_btn.innerHTML='<i class="fas fa-pause">';
    play_flag=true;
    for(var i = 0 ;i < playlist_song.my_play_list.length; i++ ){
        if(bidx==i){
          audio_2.src = playlist_song.my_play_list[i].url;
          audio_2.play();
          back_selfhelp();
          f_idx=i;
          f_idx_help();
          break;
        }
    }
}

function back_selfhelp(){
    if(bidx-1>=0){
        bidx=bidx-1;
    }else{
        b_btn.disabled=true;
    }
}