const loadLessons=()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=>res.json())
    // .then((data)=>console.log(data));
    .then((data)=>displayLesson(data.data));
}
const displayLesson=(lessons)=>{
    // 1. get the container and empty it
    // 2. get into every lessons
    // 3. create element
    // 4. append them to container
    const levelContainer= document.getElementById('level-container');
    levelContainer.innerHTML='';
    for (let lesson of lessons){
        const btnDiv= document.createElement('div');
        btnDiv.innerHTML=`
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `;
        levelContainer.append(btnDiv);
    }
}
loadLessons();

const removeActiveButton=()=>{
    const lessonBtns= document.querySelectorAll('.lesson-btn');
    lessonBtns.forEach(btn=>btn.classList.remove('btn-active'));
}

const loadLevelWord=(id)=>{
    // console.log(id);
    const url= `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
    .then((res)=>res.json())
    .then((json)=>{
        removeActiveButton();
        const clickBtn= document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("btn-active");
        displayLevelWord(json.data);
    });
};

const loadWordDetail= async (id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    const res= await fetch(url);
    const details= await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails=(word)=>{
    const detailsContainer= document.getElementById('details-container');
    detailsContainer.innerHTML=`
    <div>
        <h2 class="text-2xl font-bold">${word.word} <i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation}</h2>
    </div>
    <div>
        <h2 class="font-bold">Meaning <i class="fa-solid fa-microphone-lines"></i></h2>
        <p>${word.meaning}</p>
    </div>
    <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
    </div>
    <div>
        <h2 class="font-bold">Synonym</h2>
        <span class="btn">Syn1</span>
        <span class="btn">Syn1</span>
    </div>
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord= (words)=>{
    // console.log(words);
    const wordContainer= document.getElementById('word-container');
    wordContainer.innerHTML=``;
    if (words.length==0){
        // alert('no word found');
        wordContainer.innerHTML=`
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bn">
            <img class="mx-auto" src="../assets/alert-error.png" />
            <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }
    words.forEach((word)=>{
        // console.log(word);
        const card= document.createElement('div');
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word? word.word : "word not found"}</h2>
            <p>Meaning/Pronunciation</p>
            <h2 class="font-bn text-2xl font-bold">"${word.meaning? word.meaning : "meaning not found"} / ${word.pronunciation? word.pronunciation : "pronunciation not found"}"</h2>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail('${word._id}')" class="btn-info bg-[#1A91FF10] hover:bg-[#1A91FF80] hover:cursor-pointer p-3"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn-speak bg-[#1A91FF10] hover:bg-[#1A91FF80] hover:cursor-pointer p-3"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
}