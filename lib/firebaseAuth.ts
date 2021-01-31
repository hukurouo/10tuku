import firebase from 'firebase/app'
import 'firebase/auth'

export function getRedirectResult(){
  firebase.auth()
  .onAuthStateChanged((user) => {
    if (user) {
      console.log(user.displayName)
      return {displayName: user.displayName, uid: user.uid}
    } else {

    }
  })
}

