let synth;
let noteStack = [[],[],[],[]];
let loop;
let drum;

AFRAME.registerComponent('collider-boy', {
  schema: {
    note: {default: 'C4'},
    id: {default: '0'}
  },
  init: function () {
    let el = this.el;
    let data = this.data;
    
    el.addEventListener('hitstart', function (e) {
      data.note = el.components['aabb-collider']['intersectedEls'][0]['components']['note-player']['data']['note'];
      noteStack[data.id].push(data.note);
      AFRAME.log(data.note +' put inside beat '+ data.id)
    })
    el.addEventListener('hitend', function () {
      AFRAME.log(data.note+ ' taken out of beat '+data.id);
      noteStack[data.id] = noteStack[data.id].filter(item => item !== data.note);
    })
  }
})

  AFRAME.registerComponent("speaker-system", {
    init: function () {
        synth = new Tone.PolySynth(12, Tone.Synth,{}).toMaster();
        drum = new Tone.MembraneSynth().toMaster();

        AFRAME.log('Synth intitiliazed');

        loop = new Tone.Sequence(function (time, i){

          if(noteStack[i].length > 0){
            for(note of noteStack[i]){
              synth.triggerAttackRelease(note,'16n',time);
            }
          }
         
          //set the columne on the correct draw frame
          Tone.Draw.schedule(function(){
           // AFRAME.log('PLAYING: ['+noteStack[0]+'-'+noteStack[1]+'-'+noteStack[2]+'-'+noteStack[3]);
          }, time);
        }, [0,1,2,3], '8n');
        loop.start(0);
        loop.loop = true;

        // realLoop = new Tone.Loop(function(time){
        //   drum.triggerAttackRelease('A2', "32n", time);
        // }, "8n").start(0);

        Tone.Transport.start();

    }
 });

 // turn controller's physics presence on only while button held down
  AFRAME.registerComponent('phase-shift', {
    init: function () {
      var el = this.el;
      el.addEventListener('gripdown', function () {
        el.setAttribute('collision-filter', {collisionForces: true})
      })
      el.addEventListener('gripup', function () {
        el.setAttribute('collision-filter', {collisionForces: false})
      })
    }
  })


  AFRAMEs.registerComponent('note-player', {
    schema:{
        note: {default:'C4'}
    },
    init: function () {
      var el = this.el;
      var self = this;
    //   el.addEventListener('hover-start', function () {
    //  //  synth.triggerAttackRelease(self.data.note,'8n');
    //   })
    //   el.addEventListener('hover-end', function() {

    //   })
    // el.addEventListener('collide', function () {
    //     // if(e.detail.body.el.classList.contains('cube') && e.detail.target.el.classList.contains('cube')){
    //     //     synth.triggerAttackRelease("C4","16n");
    //     //     console.log(e);
    //     // }
    
    //   })
    }
  })
  
      //    AFRAME.registerComponent('color-randomizer', {
    //     play: function () {
    //       this.el.addEventListener('drag-drop', function (evt) {
    //         evt.detail.dropped.setAttribute('material', 'color',
    //           '#'+(Math.random()*0xFFFFFF<<0).toString(16))
    //         // color randomizer credit: http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript#comment6801353_5365036
    //       })
    //     }
    //   })

    //   AFRAME.registerComponent('change-color-on-hover', {
//     schema: {
//       color: {default: 'red'},
//       note: {default: 'C4'}
//     },

//     init: function () {
//       var data = this.data;
//       var el = this.el;  // <a-box>
//       var defaultColor = el.getAttribute('material').color;

//       el.addEventListener('onmouseover', function () {
//         el.setAttribute('color', data.color);
//         synth.triggerAttackRelease(data.note, "8n");
//       });

//       el.addEventListener('mouseleave', function () {
//         el.setAttribute('color', defaultColor);
//       });
//     }
//   });
// AFRAME.registerComponent("generic-listener", {
//   init: function () {
//   //   const ctlL = document.getElementById("ctlL");
//   //   const ctlR = document.getElementById("ctlR");
//   //   const txt = document.getElementById("txt");

//   //   ctlL.addEventListener("ybuttondown", function (event) {
//   //     log("y button pressed!");
//   //   });

//   //   ctlL.addEventListener("xbuttondown", function (event) {
//   //     log("x button pressed!");
//   //   });

//   //   ctlR.addEventListener("abuttondown", function (event) {
//   //     log("a button pressed!");
//   //   });
//   //   ctlR.addEventListener("bbuttondown", function (event) {
//   //     log("b button pressed!");
//   //   });

//   }
// });