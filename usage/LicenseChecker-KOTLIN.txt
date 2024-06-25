package gg.minecrush.epicstaff

import gg.minecrush.epicstaff.yamlstorage.Config
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

class LicenseChecker(
    private val config: Config
) {
    private val apiURL: String = "http://snowy.codes/api/client"
    private val apiKey: String = "API_KEY"
    private val product: String = "PRODUCT_NAME"

    fun checkLicense(licenseKey: String): Boolean {
        return try {
            val url = URL(apiURL)
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.setRequestProperty("Authorization", apiKey)
            connection.doOutput = true

            val jsonInputString = """{"licensekey": "$licenseKey", "product": "$product"}"""
            connection.outputStream.use { outputStream ->
                val input = jsonInputString.toByteArray(Charsets.UTF_8)
                outputStream.write(input, 0, input.size)
            }

            BufferedReader(InputStreamReader(connection.inputStream, Charsets.UTF_8)).use { br ->
                val response = StringBuilder()
                var responseLine: String?
                while (br.readLine().also { responseLine = it } != null) {
                    response.append(responseLine!!.trim())
                }

                response.toString().contains("\"status_id\":\"SUCCESS\"")
            }
        } catch (e: Exception) {
            throw RuntimeException(e)
        }
    }
}
