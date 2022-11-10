import { usePaymentRequestService } from '@services'
import { renderHook } from '@testing-library/react-hooks'

describe('submitPaymentRequest', () => {
    it('posts a new payment request to /payment-requets and returns id of new request', async () => {
        // arrange
        const { result } = renderHook(() => usePaymentRequestService())

        const paymentRequest = {
            teamId: 1,
            dateOfPayment: '10/07/2022',
            method: 'by buying a coffee'
        }

        // act
        const response = await result.current.submitPaymentRequest(paymentRequest)

        // assert
        expect(response.id).not.toBeUndefined();
    })
})