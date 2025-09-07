const loadLessons=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=>res.json())
    // .then((data)=>console.log(data));
    .then((data)=>console.log(data.data));
}
const displayLesson=(){
    // 1. get the container and empty it
    // 2. get into every lessons
    // 3. create element
    // 4. append them to container
    
}
loadLessons();