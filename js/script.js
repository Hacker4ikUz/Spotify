let url = 'http://localhost:3001/musics'
function react() {
    axios.get(url)
        .then(res => {
            if(res.status === 200 || res.status === 201){
                reload(res.data)
                localStorage.setItem('musics', JSON.stringify(res.data))
            }
        })
        .catch(err => console.log(err))
}
react()

function reload(arr) {
    let lkd = document.querySelector('.lkd')
    lkd.innerHTML = ''
    // 1 random row
    let one = document.querySelector('.one')
    one.innerHTML = '<span>10 RANDOM SONGS</span>'
    for (let i = 0; i < 10; i++) {
        let k = Math.floor(Math.random() * 10)
        one.innerHTML += `<div class="musicrandom">
        <div class="lt">
            <b>${arr[i].id}</b>
        <img src="${arr[k].photo}" class="avatar">
        <div class="name">
            <h3 id="${arr[k].id}">${arr[k].name}</h3>
            <h5>${arr[k].artist}</h5>
        </div>
        </div>
        <div class="rt">
            <img src="./img/love.svg" class="opc love" id="${arr[k].id}">
            <span>${arr[k].duration}</span>
            <img src="./img/more.png" class="opc more" id="${arr[k].id}">
            <div class="moree">
            <h5 id="${arr[k].id}" class="dislike">DISLIKE</h5>
            <hr>
            <h5 id="add">ADD TO PLAYLIST</h5>
            <hr>
            <h5 id="play">LISTEN NOW</h5>
            </div>
        </div>
    </div>`
    }
    // 2 liked tracks
    let two = document.querySelector('.two')
    two.innerHTML = '<span>LIKED TRACKS</span>'
    for(let item of arr){
        if(item.liked === true){
            two.innerHTML += `<div class="music">
            <div class="lt">
                <b>${item.id}</b>
            <img src="${item.photo}" class="avatar">
            <div class="name">
                <h3 id="${item.id}">${item.name}</h3>
                <h5>${item.artist}</h5>
            </div>
            </div>
            <div class="rt">
                <img src="./img/green.png" class="opc love" id="${item.id}">
                <span>${item.duration}</span>
                <img src="./img/more.png" class="opc more" id="${item.id}">
                <div class="moree">
                    <h5 id="${item.id}" class="dislike">DISLIKE</h5>
                    <hr>
                    <h5 id="add">ADD TO PLAYLIST</h5>
                    <hr>
                    <h5 id="play">LISTEN NOW</h5>
                </div>
            </div>
        </div>`
        // left side menu (Liked Songs)
        lkd.innerHTML += `<a href="#">
        <p>${item.name}</p>
        <span>${item.duration}</span>
        </a>`
        }
        let lsongs = document.querySelectorAll('.lkd')
        lsongs.forEach(el => {
            el.onclick = (e) => {
                let n = e.target.innerHTML
                let artistname = arr.find(elem => elem.name === n)
                audio.src = `./musics/${n}.mp3`
                titleaud.innerHTML = n
                nameaud.innerHTML = artistname.artist
                playSong()
            }
        })
    }
    // 3 recently listened tracks
    let three = document.querySelector('.three')
    three.innerHTML = '<span>RECENTLY LISTENED</span>'
    for(let item of arr){
        if(item.recently === true){
            three.innerHTML += `<div class="music">
            <div class="lt">
                <b>${item.id}</b>
            <img src="${item.photo}" class="avatar">
            <div class="name">
                <h3 id="${item.id}">${item.name}</h3>
                <h5>${item.artist}</h5>
            </div>
            </div>
            <div class="rt">
                <img src="./img/love.svg" class="opc love" id="${item.id}">
                <span>${item.duration}</span>
                <img src="./img/more.png" class="opc more" id="${item.id}">
                <div class="moree">
                    <h5 id="${item.id}" class="dislike">DISLIKE</h5>
                    <hr>
                    <h5 id="add">ADD TO PLAYLIST</h5>
                    <hr>
                    <h5 id="play">LISTEN NOW</h5>
                </div>
            </div>
            </div>`
        }
    }
    // like and more btns :)
    let like = document.querySelectorAll('.love')
    let more = document.querySelectorAll('.more')
    let moree = document.querySelector('.moree')
    // like
    like.forEach(l => {
        l.onclick = (e) => {
            let lid = e.target.id
            let obj = arr.find(elem => elem.id === +lid)
            obj.liked = !obj.liked
            axios.patch(`${url}/${lid}`, obj)
                .then(res => {
                    if(res.status === 200 || res.status === 201){
                        localStorage.setItem('musics', JSON.stringify(res.data))
                        react()
                    }
                })
        }
    })
    // dislike 
    let dislike = document.querySelectorAll('.dislike')
    dislike.forEach(d => {
        d.onclick = (e) => {
            let id = e.target.id
            let ds = arr.find(elem => elem.id === +id)
            ds.liked = false
            axios.patch(`${url}/${id}`, ds)
                .then(res => {
                    if(res.status === 200 || res.status === 201){
                        localStorage.setItem('musics', JSON.stringify(res.data))
                        react()
                    }
                })
        }
    })
    // listen now
    let l_play = document.querySelectorAll('#play')
    l_play.forEach(p => {
        p.onclick = (e) => {
            console.log(e.target.previousSibling.previousSibling);
            let n = e.target.nextSibling.nextSibling.firstChild.nextSibling.innerHTML
            let nn = e.target.nextSibling.nextSibling.firstChild.nextSibling.nextElementSibling.innerHTML
            titleaud.innerHTML = n
            nameaud.innerHTML = nn
            audio.src = `./musics/${n}.mp3`
            playSong()
        }
    })
    let add2 = document.querySelectorAll('.add')
    add2.forEach(element => {
        element.onclick = (e) => {
            console.log(e.target.parentNode.id);
        
        }
    });
    // more
    let mz = []
    more.forEach(m => {
        m.onclick = (e) => {
            mz.push(e.target.id)
            let mr = e.target.nextSibling.nextElementSibling
            mr.style.display = 'flex'
            setTimeout(() => {
                mr.style.display = 'none'
            }, 1200);
        }
    })
     // musics play i td
     let songs = []
     let names = []
     let artists = []
     for (var i = 0; i < 10; i++){
            songs.push(arr[i].path)
            names.push(arr[i].name)
            artists.push(arr[i].artist)

     }
        // Audio player :)
        let playbtn = document.querySelector('.play')
        let prevbtn = document.querySelector('.prev')
        let nextbtn = document.querySelector('.next')
        let audio = document.querySelector('.audio')    
        let progressbox = document.querySelector('.progress_box')
        let progress = document.querySelector('.progress')
        let nameaud = document.querySelector('.nameaud')
        let titleaud = document.querySelector('.titleaud')
        let repeat = document.querySelector('.repeat')
        let start = document.querySelector('.start')
        let end = document.querySelector('.end')
        // repeat audio
        let rp = false
        repeat.onclick = () => {
            if(rp == false){
                rp = true
                repeat.src = './img/repeat1.png'
                audio.loop = 'loop'
            }else {
                rp = false
                repeat.src = './img/repeat.svg'
            }
        }
        let songIndex = 0
        function load(songs) {
            titleaud.innerHTML = names[songIndex]
            nameaud.innerHTML = artists[songIndex]
            audio.src = `${songs}`
        }
        load(songs[songIndex])
        //play
        function playSong() {
            progressbox.classList.add('playy')
            playbtn.src = './img/pause.png'
            audio.play()
        }
        //pause
        function pauseSong() {
            progressbox.classList.remove('playy')
            playbtn.src = './img/play.svg'
            audio.pause()
        }
        playbtn.addEventListener('click', () => {
            let isPlaying = progressbox.classList.contains('playy')
            if(isPlaying){
                pauseSong()
            } else {
                playSong()
            }
        })
        // next song
        function nextSong(name) {
            songIndex++
            if(songIndex > songs.length -1){
                songIndex = 0
            }
        
            load(songs[songIndex])
            playSong()
        }
        nextbtn.addEventListener('click', nextSong)
        //prev song
        function prevSong() {
            songIndex--
            titleaud.innerHTML = names
            if(songIndex < 0){
                songIndex = songs.length -1
            }
        
            load(songs[songIndex])
            playSong()
        }
        prevbtn.addEventListener('click', prevSong)
        
        // progress bar
        function updateProgress(e) {
            const {duration, currentTime} = e.srcElement
            const progressPercent = (currentTime / duration) * 100
            progress.style.width = `${progressPercent}%`
            start.innerHTML = parseInt(e.target.currentTime)
            end.innerHTML = parseInt(e.target.duration)
        }
        audio.addEventListener('timeupdate', updateProgress)
        // Set progress
        function setProgress(e) {
            const width = this.clientWidth
            const clickX = e.offsetX
            const duration = audio.duration
            audio.currentTime = (clickX / width) * duration
        }
        progressbox.addEventListener('click', setProgress)
        // autoplay
        audio.addEventListener('ended', nextSong)

        // music onclick
        let lt = document.querySelectorAll('.lt')
        lt.forEach(el => {
            el.onclick = (e) => {
                let n = e.target.nextSibling.nextSibling.firstChild.nextSibling.innerHTML
                let nn = e.target.nextSibling.nextSibling.firstChild.nextSibling.nextElementSibling.innerHTML
                titleaud.innerHTML = n
                nameaud.innerHTML = nn
                audio.src = `./musics/${n}.mp3`
                playSong()
                // let id = e.target.nextSibling.nextSibling.firstChild.nextSibling.id
                // let rec = arr.find(elem => elem.id === +id)
                // rec.recently = !rec.recently
                // axios.patch(`${url}/${id}`, rec)
                // .then(res => {
                //     if(res.status === 200 || res.status === 201){
                //         localStorage.setItem('musics', JSON.stringify(res.data))
                //         react()
                //     }
                // })
            }
        })
        // input search )
        search()
        function search() {
        let inp = document.querySelector('.inp input')
        inp.onkeyup = () => {
            let filter = arr.filter(el => el.artist.toLowerCase().includes(inp.value.toLowerCase()))
            let filter2 = arr.filter(el2 => el2.name.toLowerCase().includes(inp.value.toLowerCase()))
            let searched = document.querySelector('.searched')
            let main = document.querySelector('main')
            searched.classList.remove('none')
            searched.classList.add('searched')
            searched.innerHTML = ''
            for(let item of filter2){
                searched.innerHTML += `<div class="box">
                <div class="searchl">
                    <h4 class="gr">${item.name}</h4>
                    <h4>${item.artist}</h4>
                </div>
                <div class="searchr">
                    <p>${item.duration}</p>
                </div>
            </div>`
            }
            for(let item of filter){
                searched.innerHTML += `<div class="box">
                <div class="searchl">
                    <h4 class="gr">${item.name}</h4>
                    <h4>${item.artist}</h4>
                </div>
                <div class="searchr">
                    <p>${item.duration}</p>
                </div>
            </div>`
            }
            let box = document.querySelectorAll('.searchl')
            box.forEach(i => {
                i.onclick = (e) => {
                    let sname = i.firstChild.nextSibling.nextSibling.nextElementSibling.innerHTML
                    let path = i.firstChild.nextSibling.innerHTML
                    audio.src = `./musics/${path}.mp3`
                    titleaud.innerHTML = path
                    nameaud.innerHTML = sname
                    playSong()
                }
            })
            main.onclick = () => {
                searched.classList.add('none')
            }
        }
        }
        // playlist all )
        let newplaylist = []
        let playlists1 = document.querySelector('.playlists')
        playlists1.innerHTML = '<p class="c4">PLAYLIST</p>'
        let playlist = document.querySelector('.playlist')
        let cont = document.querySelector('.container')
        let home = document.querySelector('.home')
        let newpls = document.querySelector('.newpls')
        let playlists2 = document.querySelectorAll('.playlists')
        newpls.onclick = () => {
            inp.style.display = 'block'
            formbtn.style.display = 'block'
        }
        // add click
        let add = document.querySelectorAll('#add')
        let modal = document.querySelector('.modal')
        let overlay = document.querySelector('.overlay')
        let inp = document.querySelector('form input')
        let formbtn = document.querySelector('form button')
        let lists = document.querySelector('.lists')
        // modal flex
        add.forEach(ad => {
            ad.onclick = () => {
                modal.style.display = 'flex'
                lists.innerHTML = ''
                for(let i of pl1){
                    lists.innerHTML += `<div class="names">
                <h3>${i}</h3> 
                <h4>${i.length} songs</h4>
                </div>`
                }
            }
        })
        // modal overlay none
        overlay.onclick = () => {
            modal.style.display = 'none'
        }
        // add playlist on click
        lists.onclick = (e) => {
            let h = arr.find(elem => elem.id === +mz)
            let arr_playlist = []
            arr_playlist = JSON.parse(localStorage.getItem(e.target.nextSibling.previousSibling.innerHTML))
            arr_playlist.push(h)
            localStorage.setItem(e.target.nextSibling.previousSibling.innerHTML, JSON.stringify(arr_playlist))
            location.reload()
        }
        let arr3 = []
        // playlist reload i td
        playlists2.forEach(elem => {
            elem.onclick = (e) => {
                let leftsidename = e.target.innerHTML
                arr3.push(JSON.parse(localStorage.getItem(leftsidename)))
                cont.innerHTML = ''
                cont.innerHTML += `<header>
                <div class="left">
                    <div class="inp">
                        <img src="./img/search.svg" alt="search-ico">
                        <input type="text" name="search" placeholder="Search by name and artist">
                    </div>
                    <div class="searched none">
                        
                    </div>
                </div>
                <div class="right">
                    <div class="head_l">
                        <b>Leo Man</b>
                    </div>
                    <div class="head_r">
                        <span class="free">Free user</span>
                    </div>
                </div>
            </header>`
                cont.innerHTML += `<h1 class="c42">${leftsidename} PLAYLIST</h1>`
                for(let item of arr3[0]){
                    cont.innerHTML += `
                    <div class="one2">
                        <div class="music2">
                        <div class="lt2">
                            <b>${item.id}</b>
                            <img src="${item.photo}" class="avatar2">
                        <div class="name2">
                            <h3 id="${item.id}">${item.name}</h3>
                            <h5>${item.artist}</h5>
                        </div>
                        </div>
                        <div class="rt2">
                            <img src="./img/green.png" class="opc2 love2" id="${item.id}">
                            <span>${item.duration}</span>
                            <img src="./img/more.png" class="opc2 more2" id="${item.id}">
                            <div class="moree2">
                                <h5 id="${item.id}" class="dislike">DISLIKE</h5>
                                <hr>
                                <h5 id="add">ADD TO PLAYLIST</h5>
                                <hr>
                                <h5 id="play">LISTEN NOW</h5>
                            </div>
                        </div>
                        </div>
                    </div>`
                    search()
                    let lt2 = document.querySelectorAll('.lt2')
                    lt2.forEach(el2 => {
                    el2.onclick = (e) => {
                    let n2 = e.target.nextSibling.nextSibling.firstChild.nextSibling.innerHTML
                    let nn2 = e.target.nextSibling.nextSibling.firstChild.nextSibling.nextElementSibling.innerHTML
                    titleaud.innerHTML = n2
                    nameaud.innerHTML = nn2
                    audio.src = `./musics/${n2}.mp3`
                    playSong()
                    // recently func    
                    // let id = e.target.nextSibling.nextSibling.firstChild.nextSibling.id
                    // let rec = arr.find(elem => elem.id === +id)
                    // rec.recently = !rec.recently
                    // axios.patch(`${url}/${id}`, rec)
                    // .then(res => {
                    //     if(res.status === 200 || res.status === 201){
                    //         localStorage.setItem('musics', JSON.stringify(res.data))
                    //         react()
                    //     }
                    // })
            }
        })
                }
            }
        })
        
        let addplaylist = document.forms.addplaylist
        let playlists = JSON.parse(localStorage.getItem('playlists')) || []
        addplaylist.onsubmit = () => {
            
            let playlist = {}
            
            let fm = new FormData(addplaylist)
            
            fm.forEach((value, key) => {
                playlist[key] = value
            });
            let arr = []
            playlists.push(playlist.name)
            localStorage.setItem('playlists', JSON.stringify(playlists))
            localStorage.setItem(`${playlist.name}`, JSON.stringify(arr))
        }
        let pl1 = JSON.parse(localStorage.getItem('playlists'))
        for(let it of pl1){
            playlists1.innerHTML += `<a>${it}</a>`
        }
        playlist.onclick = () => {
            home.classList.remove('active')
            settings.classList.remove('active')
            playlist.classList.add('active')
            cont.innerHTML = ''
            cont.innerHTML = ''
            for(let item of pl1){
                cont.innerHTML = `
                <header>
                <div class="left">
                    <div class="inp">
                        <img src="./img/search.svg" alt="search-ico">
                        <input type="text" name="search" placeholder="Search by name and artist">
                    </div>
                    <div class="searched none">
                        
                    </div>
                </div>
                <div class="right">
                    <div class="head_l">
                        <b>Leo Man</b>
                    </div>
                    <div class="head_r">
                        <span class="free">Free user</span>
                    </div>
                </div>
            </header>
                <div class="cont">
                    <h1>${item}</h1>
                    <p>${item.length} songs</p>
                    <div class="musics2">
                        <div class="one">
                        </div>
                        <div class="two">
                        </div>
                        <div class="three">
                        </div>
                    </div>
                </div>`
                search()
            }
        }
        // settings
        let settings = document.querySelector('.settings')
        settings.onclick = () => {
            home.classList.remove('active')
            playlist.classList.remove('active')
            settings.classList.add('active')
            cont.innerHTML = ''
            cont.innerHTML += `
            <header>
                <div class="left">
                    <div class="inp">
                        <img src="./img/search.svg" alt="search-ico">
                        <input type="text" name="search" placeholder="Search by name and artist">
                    </div>
                    <div class="searched none">
                        
                    </div>
                </div>
                <div class="right">
                    <div class="head_l">
                        <b>Leo Man</b>
                    </div>
                    <div class="head_r">
                        <span class="free">Free user</span>
                    </div>
                </div>
            </header>
            <br>
            <div class="cont">
                <h1>SETTINGS</h1>
                <br>
                <form name="edit" class="edtform">
                    <span>Your Name</span>
                    <input type="text" name="name" value="${JSON.parse(localStorage.getItem('name'))}" class="inp2">
                    <span>Free or Premium</span>
                    <input type="checkbox" class="premium" name="prem">
                    <p>No more settings 😢</p>
                    <button class="save">Save</button>
                </form>
            </div>`
        search()
        prem()
        // form for settings
        let arr_name = []
        let edit = document.forms.edit
        edit.onsubmit = () => {
            
            let edits = {}
            
            let fm = new FormData(edit)
            
            fm.forEach((value, key) => {
                edits[key] = value
            });
            arr_name.push(edits.name)
            localStorage.setItem('name', JSON.stringify(arr_name))
        }
        function prem() {
            // premium
            let b2 = document.querySelector('.head_l b')
            b2.innerHTML = JSON.parse(localStorage.getItem('name'))
            let premium = document.querySelector('.premium')
            let btnsave = document.querySelector('.save')
            let free = document.querySelector('.free')
            let main = document.querySelector('main')
            let leftinp = document.querySelector('.left .inp')
            let leftinp2 = document.querySelector('.left .inp input')
            let leftside = document.querySelector('.leftside')
            let inp2 = document.querySelector('.inp2')
            let prem = false
            premium.onclick = () => {
                if(prem == false){
                    prem = true
                    btnsave.style.background = '#EE6F57'
                    free.innerHTML = 'Premium user'
                    leftinp.style.background = '#D77D4D';
                    leftinp2.style.background = '#D77D4D';
                    inp2.style.background = '#D77D4D'
                    settings.classList.add('activee')
                    leftside.style.boxShadow = '2px 2px 2px #000'
                    leftside.style.background = 'linear-gradient(180deg, rgba(135,35,15,1) 0%, rgba(92,52,8,1) 54%, rgba(48,23,4,1) 70%, rgba(0,0,0,1) 100%)'
                    main.style.background = 'linear-gradient(180deg, rgba(135,35,15,1) 0%, rgba(92,52,8,1) 54%, rgba(48,23,4,1) 70%, rgba(0,0,0,1) 100%)'
                }else{
                    prem = false
                    btnsave.style.background = '#00ecbe'
                    free.innerHTML = 'Free user'
                    leftinp.style.background = '#265f53';
                    leftinp2.style.background = '#265f53';
                    inp2.style.background = '#265f53'
                    settings.classList.remove('activee')
                    leftside.style.boxShadow = ''
                    leftside.style.background = 'linear-gradient(138deg, rgba(20,47,24,1) 0%, rgba(7,22,19,1) 42%, rgba(6,20,17,1) 54%, rgba(3,19,16,1) 70%, rgba(0,0,0,1) 100%)'
                    main.style.background = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(38,82,73,1) 35%, rgba(0,31,24,1) 100%)'
                }
            }
        }
        }
        // slider btn 
        let sldphoto = document.querySelector('#sldphoto')
        let name = document.querySelector('#name')
        let artist = document.querySelector('#artist')
        let time = document.querySelector('.timee')
        let btnleft = document.querySelector('.btnleft')
        let btnright = document.querySelector('.btnright')

        let sldsongs = ['Gimme The Loot', 'Hokage', 'Bandana', 'ERRDAY']
        let sldnames = ['Big Baby Tape','Big Baby Tape','Big Baby Tape & Kizaru','Big Baby Tape']
        let sldindex = 0
        btnright.onclick = () => {
            sldindex++
            if(sldindex > sldsongs.length -1){
                sldindex = 0
            }
        
            load(sldsongs[sldindex])
            audio.src = `./musics/${sldsongs[sldindex]}.mp3`
            titleaud.innerHTML = sldsongs[sldindex]
            nameaud.innerHTML = sldnames[sldindex]
            playSong()
        }
        btnleft.onclick = () => {
            sldindex--
            if(sldindex < 0){
                sldindex = sldsongs.length -1
            }
        
            load(sldsongs[sldindex])
            audio.src = `./musics/${sldsongs[sldindex]}.mp3`
            titleaud.innerHTML = sldsongs[sldindex]
            nameaud.innerHTML = sldnames[sldindex]
            playSong()
        }
        // slider 
        let s1 = document.querySelector('.s1')
        let s2 = document.querySelector('.s2')
        let s3 = document.querySelector('.s3')
        let s4 = document.querySelector('.s4')
        s1.onclick = () => {
            sldphoto.src = './img/djtape.jpg'
            name.innerHTML = 'Gimme The Loot'
            artist.innerHTML = 'BIG BABY TAPE'
            s2.classList.remove('activ')
            s3.classList.remove('activ')
            s4.classList.remove('activ')
            s1.classList.add('activ')
            time.innerHTML = '02:20'
            audio.src = `./musics/Gimme The Loot.mp3`
            titleaud.innerHTML = 'Gimme The Loot'
            playSong()
        }
        s2.onclick = () => {
            sldphoto.src = './img/babytape.jpg'
            name.innerHTML = 'Hokage'
            artist.innerHTML = 'BIG BABY TAPE'
            time.innerHTML = '02:49'
            s1.classList.remove('activ')
            s3.classList.remove('activ')
            s4.classList.remove('activ')
            s2.classList.add('activ')
            audio.src = `./musics/Hokage.mp3`
            titleaud.innerHTML = 'Hokage'
            playSong()
        }
        s3.onclick = () => {
            sldphoto.src = './img/bandana.jpg'
            name.innerHTML = 'Bandana'
            time.innerHTML = '02:31'
            artist.innerHTML = 'Big Baby Tape & Kizaru'
            s1.classList.remove('activ')
            s2.classList.remove('activ')
            s4.classList.remove('activ')
            s3.classList.add('activ')
            audio.src = `./musics/Bandana.mp3`
            titleaud.innerHTML = 'Bandana'
            playSong()
        }
        s4.onclick = () => {
            sldphoto.src = './img/Errday.jpg'
            name.innerHTML = 'ERRDAY'
            time.innerHTML = '02:37'
            artist.innerHTML = 'BIG BABY TAPE'
            s1.classList.remove('activ')
            s2.classList.remove('activ')
            s3.classList.remove('activ')
            s4.classList.add('activ')
            audio.src = `./musics/Errday.mp3`
            titleaud.innerHTML = 'ERRDAY'
            playSong()
        }
}

