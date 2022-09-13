import { InfoBox } from '@components/atoms';
import React, { useState } from 'react'

export const FineBox = ({ setUsername, setReason }) => {

    const [fine, setFine] = useState();
    const [showInfoBox, setShowInfoBox] = useState(false)

    const handleChange = (event) => {
        let fine = event.target.value;
        setFine(fine);

        if (fine.indexOf('@') > 0) {
            let usernameFine = fine;
            const usernameIndex = usernameFine.indexOf('@');
            usernameFine = usernameFine.slice(usernameIndex);
            usernameFine = usernameFine.substr(0, usernameFine.indexOf(' '));
            setUsername(usernameFine);
        }

        if (fine.indexOf('for') > 0) {
            let reasonFine = fine;
            const reasonIndex = reasonFine.indexOf('for ');
            reasonFine = reasonFine.substr(reasonIndex);
            reasonFine = reasonFine.substr(4);
            setReason(reasonFine);
        }

        if (fine.length >= 4 && fine.substr(0, 4) !== 'Fine') {
            setFine('');
            setShowInfoBox(true)
        } else {
            setShowInfoBox(false)
        }
    };

    return (
        <div>
            <textarea onChange={handleChange}></textarea>
            {showInfoBox &&
                <InfoBox title='HOW TO FINE'>
                    To fine someone, start by typing "Fine" and
                    then the username you want to fine. As
                    you start typing the username, you will see
                    suggestions pop up. Add a "for" and ...
                </InfoBox>
            }
        </div>
    )
}