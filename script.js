let currentLang = 'EN';
const FIREBASE_URL = 'https://ilmhub-platform-default-rtdb.firebaseio.com/';

const langData = {
    EN: {
        mainTitle: "🚀 CYBERSPACE <span class='accent-text'>ILMHUB</span>",
        cardDevTitle: "DEVELOPER ACCOUNT",
        cardDevDesc: "Manage worlds, teams and source code",
        btnDevLogin: "LOGIN TO NET",
        cardStudTitle: "STUDENT ACCOUNT",
        cardStudDesc: "Level up skills and build web apps",
        btnStudLogin: "SIGN IN",
        btnStudReg: "REGISTER",
        promoHeader: "✨ WHAT AWAITS YOU ON THE PLATFORM? ✨",
        promoSub: "ilmhub is an interactive academy where you turn from a player into a creator!",
        feat1Title: "Communication with others",
        feat1Desc: "Chat in real time, share epic ideas with like-minded creators and find code friends!",
        feat2Title: "Team Websites",
        feat2Desc: "Join powerful guilds and build massive websites. One for all, all for code!",
        feat3Title: "Apps of the Future",
        feat3Desc: "Design awesome user interfaces and build useful mobile apps used by millions.",
        loginTitle: "SYSTEM AUTHENTICATION",
        btnDoLogin: "AUTHORIZE",
        btnBackMain: "← BACK TO MAIN",
        regTitle: "PLAYER REGISTRATION",
        btnDoReg: "GET ACCOUNT",
        teamJoinTitle: "🔑 TELEPORT TO TEAM",
        btnJoinTeam: "BREAK IN",
        devPanelTitle: "⚡ CONTROL CENTER",
        btnDevCreateScreen: "🛠️ CREATE NEW TEAM",
        btnDevJoinExist: "🔑 ENTER EXISTING TEAM",
        btnDevJoinScreen: "👁️ ENTER AS STUDENT",
        createTeamTitle: "🛠️ NEW LOCATION",
        btnDoCreateTeam: "ACTIVATE",
        navChat: "💬 CHAT",
        navInfo: "📢 INFO",
        navMembers: "👥 MEMBERS",
        navLogout: "LOGOUT"
    },
    UZ: {
        mainTitle: "🚀 KIBERFAZO <span class='accent-text'>ILMHUB</span>",
        cardDevTitle: "DASTURCHI AKKAUNTI",
        cardDevDesc: "Dunyolar, jamoalar va kodni boshqarish",
        btnDevLogin: "TARMOQQA KIRISH",
        cardStudTitle: "O'QUVCHI AKKAUNTI",
        cardStudDesc: "Bilimlarni oshiring va saytlar yarating",
        btnStudLogin: "KIRISH",
        btnStudReg: "RO'YXATDAN O'TISH",
        promoHeader: "✨ PLATFORMADA SIZNI NIMALAR KUTMOQDA? ✨",
        promoSub: "ilmhub — bu siz shunchaki foydalanuvchidan haqiqiy yaratuvchiga aylanadigan akademiya!",
        feat1Title: "O'zaro muloqot",
        feat1Desc: "Jonli muloqot qiling, g'oyalar bilan bo'лишing va kod bo'yicha yangi do'stlar orttiring!",
        feat2Title: "Jamoaviy saytlar",
        feat2Desc: "Kuchli jamoalarga birlashing va yirik veb-saytlar yarating. Hamma kod uchun!",
        feat3Title: "Kelajak ilovalari",
        feat3Desc: "Ajoyib interfeyslar loyihalang va millionlab odamlar ishlatadigan mobil ilovalar yarating.",
        loginTitle: "TIZIMGA KIRISH",
        btnDoLogin: "AVTORIZATSIYA",
        btnBackMain: "← ASOSIY SAHIFAGA",
        regTitle: "O'YINCHI RO'YXATI",
        btnDoReg: "AKKAUNT OLISH",
        teamJoinTitle: "🔑 JAMOAGA TELEPORT",
        btnJoinTeam: "KIRISH",
        devPanelTitle: "⚡ BOSHQARUV MARKAZI",
        btnDevCreateScreen: "YANGI JAMOA YARATISH",
        btnDevJoinExist: "🔑 ESKI JAMOAGA KIRISH",
        btnDevJoinScreen: "👁️ O'QUVCHI SIFATIDA KIRISH",
        createTeamTitle: "🛠️ YANGI LOKATSIYA",
        btnDoCreateTeam: "FAOLLASHTIRISH",
        navChat: "💬 CHAT",
        navInfo: "📢 INFO",
        navMembers: "👥 A'ZOLAR",
        navLogout: "CHIQISH"
    }
};

let db = { students: [], teams: {} };
let session = JSON.parse(localStorage.getItem('ilmhub_session')) || { role: null, username: '', currentTeam: null };

function saveSession() {
    localStorage.setItem('ilmhub_session', JSON.stringify(session));
}

async function loadDataFromServer() {
    try {
        const response = await fetch(`${FIREBASE_URL}.json`);
        const data = await response.json();
        if (data) {
            db.students = data.students || [];
            db.teams = data.teams || {};
        }
    } catch (err) {
        console.error("Firebase load error:", err);
    }
}

async function saveToFirebase(path, data) {
    try {
        await fetch(`${FIREBASE_URL}${path}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error("Firebase save error:", err);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'EN' ? 'UZ' : 'EN';
    document.getElementById('lang-toggle').textContent = `🌐 ${currentLang}`;
    const L = langData[currentLang];
    document.getElementById('main-title-text').innerHTML = L.mainTitle;
    document.getElementById('card-dev-title').textContent = L.cardDevTitle;
    document.getElementById('card-dev-desc').textContent = L.cardDevDesc;
    document.getElementById('btn-dev-login').textContent = L.btnDevLogin;
    document.getElementById('card-stud-title').textContent = L.cardStudTitle;
    document.getElementById('card-stud-desc').textContent = L.cardStudDesc;
    document.getElementById('btn-stud-login').textContent = L.btnStudLogin;
    document.getElementById('btn-stud-reg').textContent = L.btnStudReg;
    document.getElementById('promo-header').textContent = L.promoHeader;
    document.getElementById('promo-sub').textContent = L.promoSub;
    document.getElementById('feat1-title').textContent = L.feat1Title;
    document.getElementById('feat1-desc').textContent = L.feat1Desc;
    document.getElementById('feat2-title').textContent = L.feat2Title;
    document.getElementById('feat2-desc').textContent = L.feat2Desc;
    document.getElementById('feat3-title').textContent = L.feat3Title;
    document.getElementById('feat3-desc').textContent = L.feat3Desc;
    document.getElementById('login-title').textContent = L.loginTitle;
    document.getElementById('btn-do-login').textContent = L.btnDoLogin;
    document.getElementById('btn-back-main1').textContent = L.btnBackMain;
    document.getElementById('btn-back-main2').textContent = L.btnBackMain;
    document.getElementById('reg-title').textContent = L.regTitle;
    document.getElementById('btn-do-reg').textContent = L.btnDoReg;
    document.getElementById('team-join-title').textContent = L.teamJoinTitle;
    document.getElementById('btn-join-team').textContent = L.btnJoinTeam;
    document.getElementById('dev-panel-title').textContent = L.devPanelTitle;
    document.getElementById('btn-dev-create-screen').textContent = L.btnDevCreateScreen;
    document.getElementById('btn-dev-join-screen').textContent = L.btnDevJoinScreen;
    document.getElementById('create-team-title').textContent = L.createTeamTitle;
    document.getElementById('btn-do-create-team').textContent = L.btnDoCreateTeam;
    document.getElementById('nav-chat').textContent = L.navChat;
    document.getElementById('nav-info').textContent = L.navInfo;
    document.getElementById('nav-members').textContent = L.navMembers;
    document.getElementById('nav-logout').textContent = L.navLogout;
}

async function showScreen(screenId, forceRole = null) {
    if (forceRole) session.role = forceRole;
    saveSession();
    
    document.querySelectorAll('.error-text, .success-text').forEach(e => e.classList.add('hidden'));
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    
    await loadDataFromServer();
    
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
    if (screenId === 'screen-dev-choice') renderDevTeamsList();
}

function renderDevTeamsList() {
    const container = document.getElementById('screen-dev-choice');
    const oldList = document.getElementById('dev-forgotten-teams-box');
    if (oldList) oldList.remove();
    const helperBox = document.createElement('div');
    helperBox.id = 'dev-forgotten-teams-box';
    helperBox.style.width = '100%';
    helperBox.style.marginTop = '20px';
    helperBox.style.padding = '15px';
    helperBox.style.background = 'rgba(0,0,0,0.5)';
    helperBox.style.border = '1px dashed #ff007f';
    helperBox.style.borderRadius = '14px';
    const objectKeys = Object.keys(db.teams);
    if (objectKeys.length === 0) {
        helperBox.innerHTML = `<h4 style="text-align:center; color:#94a3b8; font-size:0.9rem;">📂 Jamoalar hali yaratilmagan.</h4>`;
    } else {
        let listHTML = `<h4 style="color:#00f2fe; margin-bottom:10px; font-family:'Orbitron', sans-serif; text-align:center; font-size:0.9rem;">🗂️ JAMOALAR RO'YXATI:</h4>`;
        objectKeys.forEach(name => {
            listHTML += `
                <div style="display:flex; justify-content:space-between; background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:8px; margin-bottom:6px; font-size:0.8rem;">
                    <span>📛 Имя: <strong style="color:#fff;">${name}</strong></span>
                    <span>🔑 Пароль: <strong style="color:#ff007f;">${db.teams[name].password}</strong></span>
                </div>`;
        });
        helperBox.innerHTML = listHTML;
    }
    container.appendChild(helperBox);
}

async function handleLogin() {
    const userInp = document.getElementById('login-username').value.trim();
    const passInp = document.getElementById('login-password').value.trim();
    const errBlock = document.getElementById('login-error');
    
    if (session.role === 'dev') {
        try {
            const response = await fetch(`${FIREBASE_URL}developer.json`);
            const devData = await response.json();
            
            const isLocalDev = userInp === 'developer' && (passInp === 'developer2011654' || passInp === 'developer000654');

            if ((devData && devData.username === userInp && devData.password === passInp) || isLocalDev) {
                session.username = `Dev_🧹`;
                saveSession();
                showScreen('screen-dev-choice');
            } else {
                errBlock.classList.remove('hidden');
            }
        } catch (err) {
            console.error("Firebase dev login error:", err);
            errBlock.classList.remove('hidden');
        }
    } else {
        await loadDataFromServer();
        let found = db.students.find(s => s.username === userInp && s.password === passInp);
        if (found) { 
            session.username = found.username; 
            saveSession();
            showScreen('screen-student-team'); 
        } else { errBlock.classList.remove('hidden'); }
    }
}

async function handleRegister() {
    const userInp = document.getElementById('reg-username').value.trim();
    const passInp = document.getElementById('reg-password').value.trim();
    const errBlock = document.getElementById('reg-error');
    const successBlock = document.getElementById('reg-success');
    if (!userInp || !passInp) { errBlock.classList.remove('hidden'); return; }
    
    await loadDataFromServer();
    let exists = db.students.some(s => s.username === userInp);
    if (exists || userInp === 'developer') { errBlock.classList.remove('hidden'); return; }
    
    db.students.push({ username: userInp, password: passInp });
    await saveToFirebase('students', db.students);
    
    errBlock.classList.add('hidden');
    successBlock.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('login-username').value = userInp;
        document.getElementById('login-password').value = passInp;
        showScreen('screen-login', 'student');
    }, 1500);
}

async function handleCreateTeam() {
    const nameInp = document.getElementById('team-create-name').value.trim();
    const passInp = document.getElementById('team-create-pass').value.trim();
    const errBlock = document.getElementById('team-create-error');
    if (!nameInp || !passInp) { errBlock.classList.remove('hidden'); return; }
    
    await loadDataFromServer();
    if (db.teams[nameInp]) { errBlock.classList.remove('hidden'); return; }
    
    const newTeam = {
        password: passInp,
        members: [],
        messages: [],
        announcements: [{ text: "🚀 Команда создана разработчиком!" }]
    };
    
    await saveToFirebase(`teams/${nameInp}`, newTeam);
    session.role = 'dev'; session.username = `Dev_🧹`; session.currentTeam = nameInp;
    saveSession();
    enterDashboard();
}

async function handleJoinTeam() {
    const nameInp = document.getElementById('team-join-name').value.trim();
    const passInp = document.getElementById('team-join-pass').value.trim();
    const errBlock = document.getElementById('team-join-error');
    
    await loadDataFromServer();
    let team = db.teams[nameInp];
    if (team && team.password === passInp) {
        session.currentTeam = nameInp;
        if (session.role === 'student') {
            if (!team.members) team.members = [];
            if (!team.members.includes(session.username)) { 
                team.members.push(session.username); 
                await saveToFirebase(`teams/${nameInp}/members`, team.members);
            }
        } else { session.username = `Dev_🧹`; }
        saveSession();
        enterDashboard();
    } else { errBlock.classList.remove('hidden'); }
}

function enterDashboard() {
    showScreen('screen-dashboard');
    document.getElementById('current-team-badge').textContent = `TEAM: ${session.currentTeam}`;
    const devControls = document.getElementById('dev-announcement-controls');
    if (session.role === 'dev') devControls.classList.remove('hidden');
    else devControls.classList.add('hidden');
    
    if(!window.chatInterval) {
        window.chatInterval = setInterval(async () => {
            if(!session.currentTeam || document.getElementById('screen-dashboard').classList.contains('hidden')) return;
            
            let box = document.getElementById('chat-box');
            let oldScroll = box.scrollTop;
            let isAtBottom = (box.scrollHeight - box.clientHeight) - oldScroll < 60;
            
            try {
                const res = await fetch(`${FIREBASE_URL}teams/${session.currentTeam}.json`);
                const activeTeamData = await res.json();
                if(activeTeamData) {
                    db.teams[session.currentTeam] = activeTeamData;
                    renderMessages();
                    renderAnnouncements();
                    renderMembers();
                    if(!isAtBottom) { box.scrollTop = oldScroll; }
                }
            } catch(e) { console.error(e); }
        }, 2000);
    }
}

function switchTab(tabId, btn) {
    document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.btn-nav').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.remove('hidden');
    btn.classList.add('active');
}

function renderMembers() {
    const box = document.getElementById('members-box'); box.innerHTML = '';
    let team = db.teams[session.currentTeam]; if (!team) return;
    
    const devRow = document.createElement('div');
    devRow.className = 'member-row'; devRow.style.borderColor = 'var(--accent-neon)';
    devRow.innerHTML = `<div><span class="member-name" style="color:var(--accent-neon)">👤 Dev_🧹 <span class="crown-icon">👑</span></span></div><span style="color:var(--accent-neon); font-size:0.8rem; font-weight:bold; font-family:'Orbitron'">CREATOR</span>`;
    box.appendChild(devRow);

    if (!team.members || team.members.length === 0) return;
    
    team.members.forEach(username => {
        const row = document.createElement('div'); row.className = 'member-row';
        let html = `<div><span class="member-name">👤 ${username}</span></div>`;
        if (session.role === 'dev') { 
            html += `<button class="btn btn-epic btn-danger" style="width:auto; padding: 6px 15px; font-size: 0.75rem;" onclick="kickMember('${username}')">ИСKЛЮЧИТЬ</button>`; 
        }
        row.innerHTML = html; box.appendChild(row);
    });
}

async function kickMember(username) {
    let team = db.teams[session.currentTeam]; if (!team) return;
    team.members = team.members.filter(m => m !== username);
    await saveToFirebase(`teams/${session.currentTeam}/members`, team.members);
    renderMembers();
}

function renderMessages() {
    const box = document.getElementById('chat-box'); box.innerHTML = '';
    let team = db.teams[session.currentTeam]; if (!team || !team.messages) return;
    
    team.messages.forEach((msg, index) => {
        if(!msg) return;
        const bubble = document.createElement('div');
        const isDev = msg.sender.includes('Dev');
        bubble.className = `chat-bubble ${isDev ? 'bubble-dev' : 'bubble-stud'}`;
        
        let deleteBtnHTML = '';
        if (session.role === 'dev') {
            deleteBtnHTML = `<button class="btn-delete-msg" onclick="deleteMessage(${index})">[X]</button>`;
        }

        let senderClass = isDev ? 'msg-sender-dev' : 'msg-sender-stud';
        let content = `<div class="msg-sender-info ${senderClass}"><span>${msg.sender}</span>${deleteBtnHTML}</div>`;
                      
        if (msg.type === 'text') content += `<div>${msg.text}</div>`;
        else if (msg.type === 'image') content += `<img src="${msg.src}" class="chat-uploaded-img" alt="Img">`;
        
        bubble.innerHTML = content; box.appendChild(bubble);
    });
}

async function deleteMessage(index) {
    let team = db.teams[session.currentTeam]; if (!team || !team.messages) return;
    team.messages.splice(index, 1);
    await saveToFirebase(`teams/${session.currentTeam}/messages`, team.messages);
    renderMessages();
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    let team = db.teams[session.currentTeam]; if (!input.value.trim() || !team) return;
    
    if(!team.messages) team.messages = [];
    team.messages.push({ sender: session.username, type: 'text', text: input.value });
    input.value = ''; 
    
    await saveToFirebase(`teams/${session.currentTeam}/messages`, team.messages);
    renderMessages();
    const box = document.getElementById('chat-box'); box.scrollTop = box.scrollHeight;
}

function triggerImageUpload() { document.getElementById('image-file-input').click(); }

document.getElementById('image-file-input').addEventListener('change', async function(e) {
    const file = e.target.files[0]; let team = db.teams[session.currentTeam]; if (!file || !team) return;
    const reader = new FileReader();
    reader.onload = async function(event) {
        if(!team.messages) team.messages = [];
        team.messages.push({ sender: session.username, type: 'image', src: event.target.result });
        await saveToFirebase(`teams/${session.currentTeam}/messages`, team.messages);
        renderMessages();
        const box = document.getElementById('chat-box'); box.scrollTop = box.scrollHeight;
    };
    reader.readAsDataURL(file); e.target.value = '';
});

function renderAnnouncements() {
    const box = document.getElementById('announcements-box'); box.innerHTML = '';
    let team = db.teams[session.currentTeam]; if (!team || !team.announcements) return;
    
    team.announcements.forEach((a, index) => {
        if(!a) return;
        const el = document.createElement('div'); el.className = 'announcement-item';
        let deleteBtnHTML = '';
        if (session.role === 'dev') {
            deleteBtnHTML = `<button class="btn btn-epic btn-danger" style="width:auto; padding:5px 12px; font-size:0.7rem;" onclick="deleteAnnouncement(${index})">УДАЛИТЬ</button>`;
        }
        el.innerHTML = `<span class="announcement-text">${a.text}</span> ${deleteBtnHTML}`;
        box.prepend(el);
    });
}

async function deleteAnnouncement(index) {
    let team = db.teams[session.currentTeam]; if (!team || !team.announcements) return;
    team.announcements.splice(index, 1);
    await saveToFirebase(`teams/${session.currentTeam}/announcements`, team.announcements);
    renderAnnouncements();
}

async function createAnnouncement() {
    const input = document.getElementById('announcement-input');
    let team = db.teams[session.currentTeam]; if (!input.value.trim() || !team) return;
    
    if(!team.announcements) team.announcements = [];
    team.announcements.push({ text: `📢 ${input.value}` });
    input.value = ''; 
    
    await saveToFirebase(`teams/${session.currentTeam}/announcements`, team.announcements);
    renderAnnouncements();
}

function logout() {
    if(window.chatInterval) { clearInterval(window.chatInterval); window.chatInterval = null; }
    session = { role: null, username: '', currentTeam: null };
    localStorage.removeItem('ilmhub_session');
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('team-create-name').value = '';
    document.getElementById('team-create-pass').value = '';
    document.getElementById('team-join-name').value = '';
    document.getElementById('team-join-pass').value = '';
    switchTab('tab-chat', document.getElementById('nav-chat'));
    showScreen('screen-main');
}

window.addEventListener('DOMContentLoaded', async () => {
    await loadDataFromServer();
    if (session.currentTeam && session.username) {
        enterDashboard();
    }
});
