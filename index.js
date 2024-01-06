const addRef=document.querySelector('.action .add');
const dltRef=document.querySelector('.action .delete');
const mdlRef=document.querySelector('.model');

const txtareaRef=document.querySelector('.model .left');

const taskRef=document.querySelector('.all-task');
const rightcategoryRef=document.querySelectorAll('.right .category');

const taskdeleteRef=document.querySelectorAll('.all-task .task .delete-icon .fa-solid');

const categorytopRef=document.querySelector('.category-top');

// const taskcategoryRef=document.querySelectorAll(.right .category);

addRef.addEventListener('click',function(e){
    togglemodle();
});

function defaultCategorySelection() {
    removeSelection();
    const firstCategory = document.querySelector('.right .category.p1');
    firstCategory.classList.add('selected');
}

function togglemodle(){
    const isHidden=mdlRef.classList.contains('hide');
    if (isHidden){
        mdlRef.classList.remove('hide');
    }
    else{
        defaultCategorySelection();
        mdlRef.classList.add('hide');
    }
}

// const tasks=[];
const tasks=JSON.parse(localStorage.getItem('tasks') || []);

function renderTaskList(){
    tasks.forEach((task) => {
        createTask(task);
    })
}

renderTaskList();

function addTasksInLocal(newTask){
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

txtareaRef.addEventListener('keydown',function(e){
    if (e.key=="Enter"){
        const selectedRef=document.querySelector('.selected');
        const selectCategoryName=selectedRef.getAttribute('data-category');
        const newTask={
            id:Math.random(),
            title:e.target.value,
            category: selectCategoryName
        };
        addTasksInLocal(newTask);
        togglemodle();
        e.target.value="";
        createTask(newTask);
    }
});

function createTask(taskdata){
    const task=document.createElement('div');
    task.className='task';
    task.dataset.id=taskdata.id;
    task.innerHTML=`
    <div class="task-category" data-priority="${taskdata.category}"></div>
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

function deleteTaskfromData(taskID){
    const selectedTaskIdx=tasks.findIndex((task) => Number(task.id)===Number(taskID));
    tasks.splice(selectedTaskIdx,1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

};

taskRef.addEventListener('click',function(e){
    if (e.target.classList.contains('fa-trash-can')){
        const currenttaskRef=e.target.closest('.task');
        currenttaskRef.remove();
        const taskID=currenttaskRef.dataset.id;  //we can use dataset only if classname start with "data-"
        deleteTaskfromData(taskID);
    }

    if (e.target.classList.contains('task-category')){
        const currentPriority=e.target.dataset.priority;
        const nextPriority=getNextPriority(currentPriority);
        e.target.dataset.priority=nextPriority;
        const taskId=Number(e.target.closest('.task').dataset.id);
        updatePriorityinData(taskId,nextPriority);
    }
})

function updatePriorityinData(taskId,nextPriority){
    const taskIndex=tasks.findIndex(task =>(task.id===taskId));
    tasks[taskIndex].category=nextPriority;
    localStorage.setItem('tasks', JSON.stringify(tasks));

}



function getNextPriority(currentPriority){
    const prioritiList=['p1','p2','p3','p4'];
    const currentPriorityIdx=prioritiList.findIndex((p)=> p===currentPriority);

    const nextPriorityIdx=(currentPriorityIdx+1)%4 ;
    return prioritiList[nextPriorityIdx];
}

categorytopRef.addEventListener('click',function(e){
    if (e.target.classList.contains('category')){
        const selectedPriority=e.target.dataset.priority;

        const taskListRef=document.querySelectorAll('.task');
        taskListRef.forEach(taskRef => {
            taskRef.classList.remove('hide');
            const currentTaskPriority=taskRef.querySelector('.task-category').dataset.priority;
            if(currentTaskPriority !== selectedPriority){
                taskRef.classList.add('hide');
            } 
        })
    }
});

dltRef.addEventListener('click',function(e){
    const isDeleteEnable=e.target.classList.contains('enabled');
    if (isDeleteEnable){
        e.target.classList.remove('enabled');
        toggleDeleteIcon(false);
    }
    else{
        e.target.classList.add('enabled');
        toggleDeleteIcon(true);
    }
})

function toggleDeleteIcon(visible){
    const alldeleteRef=document.querySelectorAll('.delete-icon');
    alldeleteRef.forEach(deleteRef => {
        deleteRef.style.display=visible ? "block" : "none";
    })
}