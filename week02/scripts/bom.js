document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chapterInput');
    const addButton = document.getElementById('addButton');
    const chapterList = document.getElementById('chapterList');

    addButton.addEventListener('click', () => {
        const chapterTitle = input.value.trim();

        if (chapterTitle) {
            const li = document.createElement('li');
            li.textContent = chapterTitle;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => {
                chapterList.removeChild(li);
            });

            li.appendChild(deleteButton);
            chapterList.appendChild(li);

            input.value = '';
        }

        input.focus();
    });
});