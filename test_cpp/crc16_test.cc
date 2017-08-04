#define CATCH_CONFIG_MAIN
#include "catch.hpp"
#include "./../lib/crc16.cc"
using namespace std;

TEST_CASE("CRC16 sum are computed")
{
    uint8_t stream[] = {
        0xa5, 0xd2, 0xdd, 0x70, 0x96, 0x35, 0xd7, 0xf0, 0x12, 0x0b,
        0x07, 0x7d, 0x60, 0xbe, 0x3f, 0x59, 0x1a, 0x59, 0x9f, 0x71,
        0x2f, 0x89, 0x11, 0x73,
        0x96, 0xce};

    SECTION("Checksum can return an sum array")
    {
        uint8_t sum[2];
        CRC16CheckSum(stream, 24, sum);
        REQUIRE(sum[0] == 0x96);
        REQUIRE(sum[1] == 0xce);
    }

    SECTION("Checksum can return an string by char*")
    {
        char *s = CRC16CheckSum(stream, 24);
        string sum(s);
        REQUIRE(sum == "96ce");
    }

    SECTION("Verifysum should be passed")
    {
        bool isValid = CRC16VerifySum(stream, 26);
        REQUIRE(isValid == true);
    }
}
