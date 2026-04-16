const API = "/api/courses";
function addCourse(){

const course = {
title: document.getElementById("title").value.trim(),
instructor: document.getElementById("instructor").value.trim(),
fee: parseFloat(document.getElementById("fee").value),
duration: document.getElementById("duration").value.trim(),
image: document.getElementById("image").value.trim()
};

if(!course.title || !course.instructor || !course.duration || isNaN(course.fee)){
alert("Fill all fields correctly");
return;
}

fetch(API,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify(course)
})
.then(res => {
if(res.ok){
alert("Course Added");
location.reload();
}else{
alert("Error saving course");
}
});
}

function loadCourses(){

fetch(API)
.then(res=>res.json())
.then(data=>{

let cards="";

data.forEach(c=>{

let img = c.image && c.image !== ""
? c.image
: "https://source.unsplash.com/400x200/?course";

cards+=`
<div class="col-md-4 mb-4">
<div class="glass">

<img src="${img}" class="img-fluid rounded-top">

<div class="p-3">
<h5>${c.title}</h5>
<p><b>Instructor:</b> ${c.instructor}</p>
<p><b>Fee:</b> ₹${c.fee}</p>
<p><b>Duration:</b> ${c.duration}</p>

<button class="btn btn-danger btn-sm"
onclick="deleteCourse(${c.id})">Delete</button>

</div>
</div>
</div>
`;
});

document.getElementById("data").innerHTML = cards;

});
}

function deleteCourse(id){
fetch(API+"/"+id,{method:"DELETE"})
.then(()=> loadCourses());
}

function loadTotalCourses(){
fetch(API)
.then(res=>res.json())
.then(data=>{
document.getElementById("totalCourses").innerText = data.length;
});
}