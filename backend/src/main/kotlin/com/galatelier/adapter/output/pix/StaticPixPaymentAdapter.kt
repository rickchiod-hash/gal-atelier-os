package com.galatelier.adapter.output.pix

import com.galatelier.application.port.output.PixPaymentPort
import com.galatelier.config.GalAtelierProperties
import com.galatelier.domain.model.Money
import org.springframework.stereotype.Component
import java.text.Normalizer

@Component
class StaticPixPaymentAdapter(
    private val properties: GalAtelierProperties
) : PixPaymentPort {
    override fun createCopyPaste(amount: Money, txId: String): String {
        val payloadWithoutCrc =
            tag("00", "01") +
                tag("26", tag("00", "br.gov.bcb.pix") + tag("01", properties.pixKey)) +
                tag("52", "0000") +
                tag("53", "986") +
                tag("54", amount.plain()) +
                tag("58", "BR") +
                tag("59", sanitize(properties.pixMerchantName).take(25)) +
                tag("60", sanitize(properties.pixMerchantCity).take(15)) +
                tag("62", tag("05", sanitize(txId).take(25))) +
                "6304"

        return payloadWithoutCrc + crc16(payloadWithoutCrc)
    }

    private fun tag(id: String, value: String): String =
        id + value.length.toString().padStart(2, '0') + value

    private fun sanitize(value: String): String {
        val normalized = Normalizer.normalize(value.uppercase(), Normalizer.Form.NFD)
        return normalized.replace("\\p{Mn}+".toRegex(), "")
            .replace("[^A-Z0-9 ]".toRegex(), "")
            .trim()
    }

    private fun crc16(payload: String): String {
        var crc = 0xFFFF
        for (byte in payload.toByteArray(Charsets.UTF_8)) {
            crc = crc xor (byte.toInt() shl 8)
            repeat(8) {
                crc = if ((crc and 0x8000) != 0) (crc shl 1) xor 0x1021 else crc shl 1
                crc = crc and 0xFFFF
            }
        }
        return crc.toString(16).uppercase().padStart(4, '0')
    }
}
