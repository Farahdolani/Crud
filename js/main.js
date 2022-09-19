var cName = document.getElementById("cName");
var cCat = document.getElementById("cCat");
var cPrice = document.getElementById("cPrice");
var cCap = document.getElementById("cCap");
var addbtn = document.getElementById("click");
var data = document.getElementById("data");
var delbtn = document.getElementById( "delbtn");
var cSearch = document.getElementById("cSearch");
var btnupdate =document.getElementById("btnupdate")
if ( localStorage.getItem("coursesList") == null ){
     var courses=[]; 
}

 else
 {
     var courses = JSON.parse(localStorage.getItem("coursesList"));
     display();
 }


 //var courses =  JSON.parse(localStorage.getItem("coursesList")) ;
//  display();

addbtn.onclick = function (){
if ( addbtn.innerHTML== 'Add Course')
     addcourses();
      else
     {
          update();
           addbtn.innerHTML = 'Add Course';
           clear();
           addbtn.setAttribute("disabled" , "disabled");
           cName.classList.remove('is-valid');
       
     }
     
     display();
     clear();
    
  
    
  //   console.log(courses );

     //


}





 function addcourses(){
     var course = {
          name:cName.value,
          cat:cCat.value,
          price:cPrice.value, 
          cap:cCap.value
     };
     courses.push(course);
     addbtn.setAttribute("disabled" , "disabled");
    // localStorage.setItem("hi" ,"farah");
    localStorage.setItem("coursesList",JSON.stringify(courses));
    cName.classList.remove('is-valid');
    Swal.fire({
     position: 'top-end',
     icon: 'success',
     title: 'Your work has been saved',
     showConfirmButton: false,
     timer: 1500
   })
 }
 function  display(){
     var r ="";
 
      for ( var i = 0; i< courses.length  ; i++){
         r += 
 `<tr>
      <td> ${i}</td>
      <td> ${courses[i].name} </td>
      <td>${courses[i].cat}</td>
      <td>${courses[i].price}</td>
      <td>${courses[i].cap}</td>
       <td>
             <div class="d-grid gap-2 d-md-flex justify-content-md-end">
               <button class="btn btn-primary me-md-2"   id ="btnupdate" onclick="getdata(${i})"  type="button">update</button>
               <button class="btn btn-danger" onclick=" deletecourse(${i})" type="button">Delete</button>
             </div>
           </td>
    </tr>`;   
      }
   data.innerHTML = r;
 
 
 }
 function clear(){
     //clear
  cName.value= " ";
  cCat.value= " ";
  cPrice.value= " ";
  cCap.value= " ";

 }
 function deletecourse (index){


Swal.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!'
   }).then((result) => {
     if (result.isConfirmed) {
          courses.splice(index,1);
          display();
       Swal.fire(
         'Deleted!',
         'Your file has been deleted.',
         'success'
       )
     }
   })

localStorage.setItem("coursesList",JSON.stringify(courses));



 }
 delbtn.onclick = function () {
     courses= [];
localStorage.removeItem("coursesList");
data.innerHTML="";
     
 }

 function search (e){
     var r = "";
     for ( var i=0 ;i < courses.length ; i++ ) {
          if ( courses[i].name.toLowerCase().includes (e.toLowerCase() ))  
          {
            r += 
          `<tr>
               <td> ${i}</td>
               <td> ${courses[i].name} </td>
               <td>${courses[i].cat}</td>
               <td>${courses[i].price}</td>
               <td>${courses[i].cap}</td>
                <td>
                      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary me-md-2"  onclick="getdata(${i})"  type="button">update</button>
                        <button class="btn btn-danger" onclick=" deletecourse(${i})" type="button">Delete</button>
                      </div>
                    </td>
             </tr>`;    

                 // console.log("hi");
          }
       

          
    
     }
    
    data.innerHTML = r;
   // console.log(r);
}
var currentindex ;

 function getdata (index){
     var course = courses[index];
     cName.value= course.name;
     cPrice.value =course.price; 
     cCat.value= course.cat;
     cCap.value = course.cap;
   
     addbtn.innerHTML = "Update";

     currentindex = index ;///// to put data to input form
 }


 function update (){
 
     var course = {
          name:cName.value,
          cat:cCat.value,
          price:cPrice.value, 
          cap:cCap.value
     };

     Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) { 
     courses [currentindex].name =  course.name;
     courses [currentindex].price = course.price; 
     courses [currentindex].cat =  course.cat;
     courses [currentindex].cap= course.cap;
            Swal.fire('Saved!', '', 'success') ;
    

localStorage.setItem("coursesList",JSON.stringify(courses));
display();


          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
   
 }


cName.onkeyup = function (){
  var pattern = /^[A-Z][a-z]{2,8}$/;
  if ( pattern.test(cName.value)){
    addbtn.removeAttribute("disabled");
    cName.classList.add('is-valid');
    cName.classList.remove('is-invalid');
   // nameAlert.classList.add('d-none');


  }
  else {
    addbtn.setAttribute("disabled" , "disabled");
    cName.classList.add('is-invalid');
  }
 

}