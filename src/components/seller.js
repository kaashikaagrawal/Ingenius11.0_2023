import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

function SoldBy() {
  const [soldMessage, setSoldMessage] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var currentUserEmail = user.email;
        var soldByRef = firebase.database().ref('bought/' + user.uid + '/soldBy');
    
        soldByRef.once('value').then(function(snapshot) {
          var soldByEmail = snapshot.val();
          if (currentUserEmail === soldByEmail) {
            setSoldMessage('It has been sold.');
          }
        });
      }
    });
  }, []);

  return (
    <div>{soldMessage}</div>
  );
}

export default SoldBy;
