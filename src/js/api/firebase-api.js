import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth, db} from "../../firebase";
import {collection, getDocs, addDoc, deleteDoc, setDoc, doc} from "firebase/firestore";



// Авторизация через firebase с помощью почты и пароля
export async function authInFirebase({email, password}) {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);

        if (response) {
            console.log(response);
            return response;
        }
    } catch (e) {
        console.error(e);
        alert('Wrong email or password');
    }
}

// Регистрация через firebase
export async function registerInFirebase({email, password}) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user && user.email) {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    email: user.email
                });


            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    } catch (e) {
        alert(`An error occurred during sign up: ${e}`);
    }
}

// logout
export async function logoutFromFirebase(){
    await signOut(auth);
}

// Получение задач
export async function getTasks(ownerEmail) {
    try {
        // Получаем задачи из firebase db
        const response = await getDocs(collection(db, 'tasks'));
        console.log(response);

        // Извлекаем задачи из ответа
        const tasksList = response.docs.map(doc => ({
            ...doc.data(), id: doc.id,
        }));
        console.log(tasksList);

        return tasksList;
    } catch (e) {
        console.log('An error occurred during events fetching', e)
    }
}

// Дабавить задачу
export async function addTask(task) {
    try {
        const docRef = await addDoc(collection(db, 'tasks'), task);
        const taskWithID = {...task, id: docRef.id}

        console.log(taskWithID);
        return taskWithID;
    } catch (e) {
        console.log(e);
    }
}

// Изменить задачу
export async function setTask(task) {
    try {
        const taskRef = doc(db, 'tasks', task.id);
        await setDoc(taskRef, task, { merge: true });

        return task;
    } catch (e) {
        console.log(e);
    }
}

// Удалить задачу
export async function deleteTask(taskID) {
    try {
        await deleteDoc(doc(db, 'tasks', taskID));
        return taskID;
    } catch (e) {
        console.log(e)
    }
}

// Запросить пользователей
export async function getUsers(ownerEmail) {
    try {
        const response = await getDocs(collection(db, 'users'));
        const usersList = response.docs.map(doc => ({
            uid: doc.data().uid,
            email: doc.data().email
        })).filter(user => user.email !== ownerEmail);
        console.log(usersList);

        return usersList;
    } catch (e) {
        console.log('An error occurred during users fetching', e)
    }
}