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

const method = window.editId ? "PUT" : "POST";
const url = window.editId ? API + "/" + window.editId : API;

fetch(url,{
method: method,
headers:{ "Content-Type":"application/json"},
body: JSON.stringify(course)
})
.then(res => {
if(res.ok){
alert(window.editId ? "Course Updated" : "Course Added");
window.editId = null;
location.href="courses.html";
}else{
alert("Error saving course");
}

localStorage.removeItem("editCourse");
});
}

function loadCourses(){
fetch(API)
.then(res=>res.json())
.then(data=>{
displayCourses(data);
});
}


function displayCourses(data){
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

<button class="btn btn-primary btn-sm me-2"
onclick="goToEdit(${c.id}, \`${c.title}\`, \`${c.instructor}\`, ${c.fee}, \`${c.duration}\`, \`${c.image}\`)">
Edit
</button>

</div>
</div>
</div>
`;
});

document.getElementById("data").innerHTML = cards;
}

function goToEdit(id, title, instructor, fee, duration, image){

const course = { id, title, instructor, fee, duration, image };

// store in browser
localStorage.setItem("editCourse", JSON.stringify(course));

// go to form page
window.location.href = "add-course.html";
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

function editCourse(id, title, instructor, fee, duration, image){
    document.getElementById("title").value = title;
    document.getElementById("instructor").value = instructor;
    document.getElementById("fee").value = fee;
    document.getElementById("duration").value = duration;
    document.getElementById("image").value = image;

    // store id globally
    window.editId = id;
}


function searchCourse(){
let input = document.getElementById("search").value.toLowerCase();

fetch(API)
.then(res=>res.json())
.then(data=>{

let filtered = data.filter(c =>
c.title.toLowerCase().includes(input) ||
c.instructor.toLowerCase().includes(input)
);

displayCourses(filtered);
});
}