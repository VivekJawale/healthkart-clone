var parallax=document.getElementsByClassName("parallax");
var parallax2=document.getElementsByClassName("parallax_2");

window.addEventListener("scroll",function(){
    let offset=window.pageYOffset;
    // console.log(offset);
    parallax[0].style.backgroundPositionY= offset*0.7+"px";
    parallax2[0].style.backgroundPositionY= offset*0.7+"px";
})