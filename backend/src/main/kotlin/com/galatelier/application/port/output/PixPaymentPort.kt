package com.galatelier.application.port.output

import com.galatelier.domain.model.Money

interface PixPaymentPort {
    fun createCopyPaste(amount: Money, txId: String): String
}
