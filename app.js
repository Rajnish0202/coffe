// hide Preloader
// all the images scripts links have finished loading
// method 1

// window event listener

// window.addEventListener('load',function(){
//     this.document.querySelector('.preloader').style.display ="none";
// })

// // nav Btn

// document.querySelector('.navBtn').addEventListener('click',function(){
//     document.querySelector('.nav').classList.toggle('nav--show')
// })

// Method 3
// a base class is defined using the new reserved 'class' keyword
// class UI {
//     // simple class instance methods
//     hidePreloader(){
//         document.querySelector('.preloader').style.display = "none"
//     }
//     showNav(){
//         document.querySelector('.nav').classList.toggle('nav--show')
//     }
// }

eventListener();
function eventListener() {
    const ui = new UI()
    // preloader
    window.addEventListener('load', () => ui.hidePreloader());
    
    // nav Btn
    document.querySelector('.navBtn').addEventListener('click',() => ui.showNav());

    // control video
    document.querySelector('.video_switch').addEventListener('click',function(){
        ui.videoControls()
    })
    // submit the form
    document.querySelector('.drink-form').addEventListener('submit',function(event){
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastName = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastName, email)

        // console.log(value);
        if(value){
            let customer = new Customer(name, lastName, email)
            // console.log(customer);
            ui.addCustomer(customer)
            ui.showFeedback('customer added to the list','success')
            ui.clearFields()
        }
        else{
            ui.showFeedback('some form values empty','error')
        }
    })
    // Display Modal
    const links = document.querySelectorAll('.work-item_icon');
    // console.log(links);
    links.forEach(function(item){
        item.addEventListener('click',function(event){
            ui.showModal(event);
        })
    })

    // Hide modal
    document.querySelector('.work-modal_close').addEventListener('click',function(){
        ui.closeModal()
    })
}



// eventListener();
// function eventListener(){
//     const ui = new UI()
//     // preloader
//     window.addEventListener('load',function(){
//         ui.hidePreloader();
//     })
//     // nav Btn
//     document.querySelector('.navBtn').addEventListener('click',function(){
//         ui.showNav();
//     })
// }

// constructor Function method method 2
function UI(){

}

// hide preloader
UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display = 'none';
}

// show Nav
UI.prototype.showNav = function () {
    document.querySelector('.nav').classList.toggle('nav--show')
}

// play/pause the video
UI.prototype.videoControls = function () {
    let btn = document.querySelector('.video_switch-btn');
    if(!btn.classList.contains('btnSlider')){
        btn.classList.add('btnSlider');
        document.querySelector('.video_item').pause()
    }
    else{
        btn.classList.remove('btnSlider')
        document.querySelector('.video_item').play()
    }
}

// check for empty values
UI.prototype.checkEmpty = function(name, lastname, email){
    let result;
    if(name === '' || lastname === '' || email === ''){
        result = false;
    }
    else{
        result = true;
    }
    return result;
}

UI.prototype.showFeedback = function(text,type){
    const feedback = document.querySelector('.drink-form_feedback');

    if(type === 'success'){
        // let feedback = document.querySelector('.drink-form_feedback');
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');
    }
    else if(type === 'error'){
        // let feedback = document.querySelector('.drink-form_feedback');
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');
    }
}

// remove Alert
UI.prototype.removeAlert = function(type){
    setTimeout(function(){
        document.querySelector('.drink-form_feedback').classList.remove(type)
        },3000)
}

// Add Customer

UI.prototype.addCustomer = function(customer){
    const images = [1,2,3,4,5];
    let random= Math.floor(Math.random()*images.length);
    // console.log(random);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="./image/student-${random}.png" alt="person" class="person_thumbnail">
                        <h4 class="person_name">${customer.name}</h4>
                        <h4 class="person_last-name">${customer.lastname}</h4>`
    document.querySelector('.drink-card_list').append(div);
}

// Clear Fields
UI.prototype.clearFields = function(){
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}

// Display Modal
UI.prototype.showModal = function(event){
    event.preventDefault();
    // console.log(event.target.parentElement);
    if(event.target.parentElement.classList.contains('work-item_icon'));
    let id = event.target.parentElement.dataset.id
    console.log(id);
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal_item');

    modal.classList.add('work-modal-show')
    modalItem.style.backgroundImage = `url(./image/work-${id}.jpg)`
}

// Hide Model
UI.prototype.closeModal = function(){
    document.querySelector('.work-modal').classList.remove('work-modal-show');
}

// 
function Customer(name,lastname,email){
    this.name = name,
    this.lastname  = lastname,
    this.email = email;
}