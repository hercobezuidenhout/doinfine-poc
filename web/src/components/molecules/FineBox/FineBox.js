import { TextField } from '@mui/material';
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
            <TextField sx={{
                width: '100%'
            }} rows={4} multiline={true} onChange={handleChange}></TextField>
            {showInfoBox &&
                <p>Please format your fine as Fine @someone for something ...</p>
            }
        </div>
    )
}