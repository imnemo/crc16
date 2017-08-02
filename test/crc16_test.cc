#include <iostream>
#include "./../lib/crc16.cc"
using namespace std;

int main()
{
    uint8_t stream[26] = {
        0x3a, 0x16, 0x07, 0x0a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1a, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x16, 0x00, 0x17, 0x30, 0x05, 0x39, 0x90, 0x4e, 0x45,
        0xa0, 0x3b
    };

    uint8_t sum[2];
    CRC16CheckSum(stream, 24, sum);
    cout << "crc check sum return an array: " << (uint16_t)sum[0] << " " << (uint16_t)sum[1] << endl;

    char *s = CRC16CheckSum(stream, 24);
    cout << "crc check sum return a str: " << s << endl;

    bool isVerify = CRC16VerifySum(stream, 26);
    cout << "crc verify sum result: " << isVerify << endl;
}
