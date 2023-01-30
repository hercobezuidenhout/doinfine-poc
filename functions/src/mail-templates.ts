export const newFineRequestTemplate = ({ finer, finee, reason, requestId }) => ({
    subject: '📝 A new fine request has been submitted',
    message: (`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                button {
                    border: none;
                    background-color: #ef233c;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
        <div>
            <p>${finer} wants to fine ${finee} for ${reason}</p>
            <a href='https://doinfine.app/fine-requests/${requestId}'><button>View Request</button></a>
        </div>
        </body>
        </html>
    `)
})

export const newPaymentRequestTemplate = ({ userMakingPayment, action, requestId }) => ({
    subject: '💸 A new payment request has been submitted',
    message: (`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                button {
                    border: none;
                    background-color: #ef233c;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
        <div>
            <p>${userMakingPayment} claims to have paid off a fine by ${action}.</p>
            <a href='https://doinfine.app/payment-requests/${requestId}'><button>View Request</button></a>
        </div>
        </body>
        </html>
    `)
})

export const fineRequestApprovedTemplate = ({ finer, finee, reason }) => ({
    subject: `👨‍⚖️ ${finee} has been fined!`,
    message: (`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                button {
                    border: none;
                    background-color: #ef233c;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
        <div>
            <p>${finee} has been fined by ${finer} for ${reason}</p>
            <a href='https://doinfine.app'><button>View in App</button></a>
        </div>
        </body>
        </html>
    `)
})

export const fineRequestRejectedTemplate = ({ finer, finee, reason }) => ({
    subject: `👨‍⚖️ ${finer}'s request has been rejected!`,
    message: (`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                button {
                    border: none;
                    background-color: #ef233c;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
        <div>
            <p>${finee} has not been fined by ${finer} for ${reason}</p>
            <a href='https://doinfine.app'><button>View in App</button></a>
        </div>
        </body>
        </html>
    `)
})

export const paymentRequestApprovedTemplate = ({ userMakingPayment, action }) => ({
    subject: `⭐️ ${userMakingPayment} has paid off a fine!`,
    message: (`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                button {
                    border: none;
                    background-color: #ef233c;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
        <div>
            <p>${userMakingPayment} has paid of a fine by ${action}.</p>
            <a href='https://doinfine.app'><button>View in App</button></a>
        </div>
        </body>
        </html>
    `)
})

export const paymentRequestRejectedTemplate = ({ userMakingPayment, action }) => ({
    subject: `⭐️ ${userMakingPayment}'s payment has been rejected!`,
    message: (`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                button {
                    border: none;
                    background-color: #ef233c;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                }
            </style>
        </head>
        <body>
        <div>
            <p>${userMakingPayment} has not paid of any fines by ${action}.</p>
            <a href='https://doinfine.app'><button>View in App</button></a>
        </div>
        </body>
        </html>
    `)
})