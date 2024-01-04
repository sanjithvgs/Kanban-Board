const addRef=document.querySelector('.action .add');
const dltRef=document.querySelector('.action .delete');
const mdlRef=document.querySelector('.model');

const txtareaRef=document.querySelector('.model .left');

const taskRef=document.querySelector('.all-task');
const rightcategoryRef=document.querySelectorAll('.right .category');

const taskdeleteRef=document.querySelectorAll('.all-task .task .delete-icon .fa-solid');



// const taskcategoryRef=document.querySelectorAll(.right .category);

addRef.addEventListener('click',function(e){
    tooglemodle();
});

function defaultCategorySelection() {
    removeSelection();
    const firstCategory = document.querySelector('.right .category.p1');
    firstCategory.classList.add('selected');
}

function tooglemodle(){
    const isHidden=mdlRef.classList.contains('hide');
    if (isHidden){
        mdlRef.classList.remove('hide');
    }
    else{
        defaultCategorySelection();
        mdlRef.classList.add('hide');
    }
}

const tasks=[];

txtareaRef.addEventListener('keydown',function(e){
    if (e.key=="Enter"){
        const selectedRef=document.querySelector('.selected');
        const selectCategoryName=selectedRef.getAttribute('data-category');
        const newTask={
            id:Math.random(),
            title:e.target.value,
            category: selectCategoryName
        };
        tasks.push(newTask);
        tooglemodle();
        e.target.value="";
        createTask(newTask);
    }
});

function createTask(taskdata){
    const task=document.createElement('div');
    task.className='task';
    taskRef.dataset.id=task.id;
    task.innerHTML=`
    <div class="task-category ${taskdata.category}"></div>
    <div class="task-id">${taskdata.id}</div>
    <div class="task-title">${taskdata.title}</div>
    <div class="delete-icon"><i class="fa-solid fa-trash-can"></i></div>
    `;

    taskRef.appendChild(task);
    // const deleteiconRef=task.querySelector('.delete-icon');
    // deleteiconRef.addEventListener('click',function(e){
    //     const selectTask=e.target.closest('.task');
    //     // selectTask.classList.add('hide');   => not recommended 
    //     selectTask.remove();
    //     deleteTaskfromData(taskdata.id);
    // });

}

rightcategoryRef.forEach(function(element){
    element.addEventListener('click',function(e){
        removeSelection();
        e.target.classList.add("selected");
    })
});

function removeSelection(){
    rightcategoryRef.forEach(function(element){
        element.classList.remove("selected");
    })
}

function deleteTaskfromData(taskid){
    const selectedTask=tasks.findIndex((task)=> task.id===taskid);
    tasks.splice(selectedTask,1);

};

taskRef.addEventListener('click',function(e){
    console.log(e.target.classList.contains('fa-trash'))
    if (e.target.classList.contains('fa-trash-can')){
        const currenttaskRef=e.target.closest('.task');
        currenttaskRef.remove();
        const taskID=currenttaskRef.dataset.id;
        deleteTaskfromData(taskID);
        // deleteTaskfromData(taskdata.id);
    }
})

function getNextPriority(currentPriority){
    const prioritiList=['p1','p2','p3','p4'];
    const currentPriorityIdx=prioritiList.findIndex((p)=> p===currentPriority);

    const nextPriority=(currentPriority+1)%4 ;
    return nextPriority;
}