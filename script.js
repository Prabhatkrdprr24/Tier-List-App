let currentDragedItem;

const tierInput=document.getElementById('tier');
// console.log(tierInput);

const submitBtn=document.getElementById("submit");
submitBtn.addEventListener('click',(event)=>{
    // console.log("Button is clicked");
    // console.log(event);

    // To stop the default behaviour of the event 
    event.preventDefault();

    //To get acess of element on which this event is fired
    const target=event.target;
    // console.log(target);

    if(tierInput.value===''){
        alert("Enter name of tier !!");
        return;
    }
    createTierList(tierInput.value);
    tierInput.value='';
})
function createTierList(tierListName){
    const newTierList=document.createElement('div');
    newTierList.classList.add("tier-list");

    const heading=document.createElement('h1');
    heading.classList.add('headingId');
    heading.textContent=tierListName;

    const newTierListItems=document.createElement('div');
    newTierListItems.classList.add("tier-list-items");

    setupDropZoneInTierList(newTierListItems);

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    const tierSection=document.getElementById('tier-list-section');
    tierSection.appendChild(newTierList);

}

const imageForm=document.getElementById('image-form');
imageForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    // console.log("form submitted");

    const formData=new FormData(imageForm);
    // console.log(formData);

    const imageItemInput=document.getElementById("image-item");
    const imageurl=imageItemInput.value;
    // console.log(imageurl);
    if(imageurl==''){
        alert("Enter valid url of image !!");
        return;
    }
    createTierListItem(imageurl);
    imageItemInput.value='';
})

function createTierListItem(imageurl){

    const imageDiv=document.createElement('div');
    imageDiv.classList.add('item-container');
    imageDiv.setAttribute('dragable','true');

    setupItemContainerForDrag(imageDiv);;

    const img=document.createElement('img');
    img.src=imageurl;
    imageDiv.appendChild(img);

    const nonTierSection=document.getElementById('non-tier-section');
    nonTierSection.appendChild(imageDiv);
}

const itemContainers=document.getElementsByClassName("item-container");
for(const itemContainer of itemContainers){
    setupItemContainerForDrag(itemContainer);
}
function setupItemContainerForDrag(itemContainer){
    itemContainer.addEventListener('dragstart',(event)=>{
        console.log(event.target);
        currentDragedItem=event.target.parentNode;
    })

    itemContainer.addEventListener('dblclick',(event)=>{
        const nonTierSection=document.getElementById('non-tier-section');

        // nonTierSection.appendChild(itemContainer);
          //OORR
        nonTierSection.appendChild(event.target.parentNode);
    })
}

function setupDropZoneInTierList(newTierList){
    newTierList.addEventListener('drop',(event)=>{
        event.preventDefault();
    })
    newTierList.addEventListener('dragover',function (event){
        console.log(event.target);
        console.log("draging over drop zone");
        if(this !== currentDragedItem.parentNode){
            this.appendChild(currentDragedItem);
        }
    })
}