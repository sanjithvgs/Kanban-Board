const addRef=document.querySelector('.action .add');
const dltRef=document.querySelector('.action .delete');
const mdlRef=document.querySelector('.model');

const txtareaRef=document.querySelector('.model .left');

const taskRef=document.querySelector('.all-task');

const taskcategoryRef=document.querySelectorAll(.right .category);

addRef.addEventListener('click',function(e){
    tooglemodle();
});

function tooglemodle(){
    const isHidden=mdlRef.classList.contains('hide');
    if (isHidden){
        mdlRef.classList.remove('hide');
    }
    else{
        mdlRef.classList.add('hide');
    }
}

const tasks=[];

txtareaRef.addEventListener('keydown',function(e){
    if (e.key=="Enter"){
        const newTask={
            id:Math.random(),
            title:e.target.value,
            category: 'p1'
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
    task.innerHTML=`
    <div class="task-category"></div>
    <div class="task-id">${taskdata.id}</div>
    <div class="task-title">${taskdata.title}</div>
    `;

    taskRef.appendChild(task);

}




