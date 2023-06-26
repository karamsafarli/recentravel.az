const dturForm = document.querySelector('.dtur_form');
dturForm.addEventListener('submit', async (e) => {
    const dturFileInput = document.querySelector('.dtur_file_input')
    const dturFile = dturFileInput.files[0]
    const dTurFormData = new FormData();

    const dturCity = document.querySelector('.dtur_city').value;
    const dturTitle = document.querySelector('.dtur_title').value;
    const dturPrice = document.querySelector('.dtur_price').value;
    dTurFormData.append('city', dturCity);
    dTurFormData.append('title', dturTitle);
    dTurFormData.append('price', dturPrice);
    dTurFormData.append('image', dturFile);
    dTurFormData.append('imagePath', dturFile.name);

    const res = await fetch('/daxili-turlar', {
        method: 'POST',
        body: dTurFormData,
    });
});


const xturForm = document.querySelector('.xarici_form');
xturForm.addEventListener('click', async (e) => {
    const xturFileInput = document.querySelector('.xtur_file_input')
    const xturFile = xturFileInput.files[0]
    const xTurFormData = new FormData();

    const xturCity = document.querySelector('.xtur_city').value;
    const xturTitle = document.querySelector('.xtur_title').value;
    const xturPrice = document.querySelector('.xtur_price').value;
    xTurFormData.append('city', xturCity);
    xTurFormData.append('title', xturTitle);
    xTurFormData.append('price', xturPrice);
    xTurFormData.append('image', xturFile);
    xTurFormData.append('imagePath', xturFile.name);

    const res = await fetch('/xarici-turlar', {
        method: 'POST',
        body: xTurFormData,
    })
})


const dTurDelBtn = [...document.querySelectorAll('.dtur-delbtn')];
dTurDelBtn.map((el, index) => {
    el.addEventListener('click', async (e) => {
        let permission = confirm('Silmək üçün təsdiqlə');
        if (permission) {
            await fetch(`/daxili-turlar/${el.dataset.id}`, {
                method: 'DELETE'
            })
        } else {
            e.preventDefault()
        }
    })
});

const xTurDelBtn = [...document.querySelectorAll('.xtur-delbtn')];
xTurDelBtn.map((el, index) => {
    el.addEventListener('click', async (e) => {
        let permission = confirm('Silmək üçün təsdiqlə');
        if (permission) {
            await fetch(`/xarici-turlar/${el.dataset.id}`, {
                method: 'DELETE'
            })
        } else {
            e.preventDefault()
        }
    })
});

const bgFormbtn = document.querySelector('.bg_form_btn');
bgFormbtn.addEventListener('click', async (e) => {
    const bgImg = document.querySelector('.bgimg').files[0]
    const formData = new FormData();
    formData.append('image', bgImg)
    try {
        const res = await fetch('/update-images-1', {
            method: 'POST',
            body: formData
        })
    } catch (error) {
        console.log(error)
    }
});

const img1FormBtn = document.querySelector('.img1_form_btn');
img1FormBtn.addEventListener('click', async (e) => {
    const img = document.querySelector('.img1').files[0];
    const text = document.querySelector('.text1').value;
    const formData = new FormData();
    formData.append('image', img);
    formData.append('text', text);

    try {
        const res = await fetch('/update-images-2', {
            method: 'POST',
            body: formData
        })
    } catch (error) {
        console.log(error)
    }
});


const img2FormBtn = document.querySelector('.img2_form_btn');
img2FormBtn.addEventListener('click', async (e) => {
    const img = document.querySelector('.img2').files[0];
    const text = document.querySelector('.text2').value;
    const formData = new FormData();
    formData.append('image', img);
    formData.append('text', text);

    try {
        const res = await fetch('/update-images-3', {
            method: 'POST',
            body: formData
        })
    } catch (error) {
        console.log(error)
    }
});


const img3FormBtn = document.querySelector('.img3_form_btn');
img3FormBtn.addEventListener('click', async (e) => {
    const img = document.querySelector('.img3').files[0];
    const text = document.querySelector('.text3').value;
    const formData = new FormData();
    formData.append('image', img);
    formData.append('text', text);

    try {
        const res = await fetch('/update-images-4', {
            method: 'POST',
            body: formData
        })
    } catch (error) {
        console.log(error)
    }
});


const EmployeeForm = document.querySelector('.employee_container form');

EmployeeForm.addEventListener('submit', async () => {
    const name = document.querySelector('.emp_name').value;
    const job = document.querySelector('.emp_job').value;
    const description = document.querySelector('.emp_about').value;
    const img = document.querySelector('.emp_img').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('job', job);
    formData.append('description', description);
    formData.append('image', img);

    try {
        const res = await fetch('/about', {
            method: 'POST',
            body: formData
        })
    } catch (error) {
        console.log(error)
    }
});


const employeeDelBtn = [...document.querySelectorAll('.emp_delbtn')];
employeeDelBtn.map((el) => {
    el.addEventListener('click', async (e) => {
        const permission = confirm("Silmək üçün təsdiqlə");
        if (permission) {
            try {
                const res = await fetch(`/about/${el.dataset.id}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                console.log(error)
            }
        } else {
            e.preventDefault()
        }
    })
})