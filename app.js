    // slider
    var sizeSlider = document.getElementsByClassName('slide')[0].clientWidth;
    console.log(sizeSlider); // 1000 (width class slide = 1000px)
    var moveSlider = document.getElementsByClassName("move-slider")[0]
    var Img =moveSlider.getElementsByTagName("img");
    var Max = sizeSlider * Img.length; // 1000 * Img.length
    Max -= sizeSlider;
    var moveReset = 0;
    function Next(){
        if (moveReset < Max) {
            moveReset += sizeSlider;
        }
        else {
            moveReset = 0;
        }
        // moveReset += sizeSlider; // 0 + 1000
        moveSlider.style.marginLeft = '-' + moveReset + 'px'; // - 1000px
    }
    function Back() {
        if (moveReset == 0){
            moveReset = Max;
        }
        else {
            moveReset -= sizeSlider;
        }
        moveSlider.style.marginLeft = '-' + moveReset + 'px';
    }
    
    setInterval(function () {
        // công việc cần thực hiện
        Next(); // cứ 3000ms gọi Next 1 lần
    },3000)
    
    // tabs ui
    const $ = document.querySelector.bind(document); // gắn kết 1 tài liệu truy vấn html dom
        const $$ = document.querySelectorAll.bind(document); // gắn kết tất cả tài liệu truy vấn html dom
    
        const tabs = $$(".tab-item") // lay tat ca element chứa attribute
        const panes = $$(".tab-pane") // lay tat ca element chứa attribute
    
        const tabActive = $(".tab-item.active");
        const line = $(".tabs .line");
    
        line.style.left = tabActive.offsetLeft + "px"; // trượt sang
        line.style.width = tabActive.offsetWidth + "px"; // chiều rộng trượt
    
        tabs.forEach( (tab, index) => { // lấy ra từng phần phần tử trong mảng (tabs)
            const pane = panes[index];
    
            tab.onclick = function() { // nhấp chuột(click) sẽ hiện ra html dom
                // console.log(this) // nhấp chuột(onclick) sẽ hiện ra toàn bộ element đó
    
                $('.tab-item.active').classList.remove('active')
                $('.tab-pane.active').classList.remove('active') // xóa class = "active" (attribute)
    
                line.style.left = this.offsetLeft + "px";
                line.style.width = this.offsetWidth + "px";
                //this là element(tab) , (pane) là index
    
                this.classList.add("active");// Thêm thêm class(.active) vào attribute
                pane.classList.add("active");// Thêm thêm class(.active) vào attribute
            }
        })
          // model

var btnOpen = document.querySelector('.open-modal-btn')
var modal = document.querySelector('.modal')
var iconClose = document.querySelector('.modal__header i')
var btnClose = document.querySelector('.modal__footer button')

function toggleModal (e) {
    // console.log(e.target);
    modal.classList.toggle('hide')

}
btnOpen.addEventListener('click', toggleModal )
btnClose.addEventListener('click', toggleModal)
iconClose.addEventListener('click', toggleModal)
modal.addEventListener('click', function(e) {
    if(e.target == e.currentTarget) {
        toggleModal()
    }
})