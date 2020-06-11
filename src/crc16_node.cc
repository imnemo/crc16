#include <napi.h>
#include <string>

#include "./../lib/crc16.cc"

uint8_t *BufferData(Napi::Buffer<uint8_t> buf_val)
{
    return (uint8_t *)buf_val.Data();
}
size_t BufferLength(Napi::Buffer<uint8_t> buf_val)
{
    return buf_val.Length();
}

Napi::Value NODECRC16CheckSum(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (!info[0].IsBuffer())
    {
        Napi::TypeError::New(env, "Input stream requires a Buffer!").ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::Buffer<uint8_t> stream = info[0].As<Napi::Buffer<uint8_t>>();

    Napi::Object option;
    if (info[1].IsNull() || info[1].IsEmpty() || !info[1].IsObject())
    {
        option = Napi::Object::New(env);
    }
    else
    {
        option = info[1].As<Napi::Object>();
    }

    uint8_t *bytes = BufferData(stream);
    size_t len = BufferLength(stream);

    if (len <= 0)
    {
        Napi::TypeError::New(env, "Stream buffer can't be empty!").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string retType = "hex";
    std::string retTypeKey = "retType";
    if (option.Has(retTypeKey) && option.Get(retTypeKey).IsString())
    {
        retType = option.Get(retTypeKey).ToString();
    }
    
    if (retType == "array")
    {
        uint8_t sumArry[2];
        CRC16CheckSum(bytes, len, sumArry);

        Napi::Array sumForReturn = Napi::Array::New(env);
        sumForReturn[0U] = sumArry[0];
        sumForReturn[1] = sumArry[1];

        return sumForReturn;
    }
    else if (retType == "buffer")
    {
        uint8_t sumArry[2];
        CRC16CheckSum(bytes, len, sumArry);
        
        Napi::Buffer<uint8_t> sumBufferForReturn = Napi::Buffer<uint8_t>::New(env, 2);
        sumBufferForReturn.Data()[0U] = sumArry[0];
        sumBufferForReturn.Data()[1] = sumArry[1];
        
        return sumBufferForReturn;
    }
    else if (retType == "int")
    {
        uint16_t sum;
        CRC16CheckSum(bytes, len, &sum);
        return Napi::Number::New(env, sum);
    }
    else
    {
        char *sumStr = CRC16CheckSum(bytes, len);
        return Napi::String::New(env, sumStr);
    }
}

Napi::Boolean NODECRC16VerifySum(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    if (!info[0].IsBuffer())
    {
        Napi::TypeError::New(env, "Input stream requires a Buffer!").ThrowAsJavaScriptException();
        return Napi::Boolean::New(env, false);
    }

    Napi::Buffer<uint8_t> stream = info[0].As<Napi::Buffer<uint8_t>>();

    uint8_t *bytes = BufferData(stream);
    size_t len = BufferLength(stream);

    if (len <= 0)
    {
        Napi::TypeError::New(env, "Stream buffer can't be empty!").ThrowAsJavaScriptException();
        return Napi::Boolean::New(env, false);
    }

    bool isValid = false;
    isValid = CRC16VerifySum(bytes, len);

    return Napi::Boolean::New(env, isValid);
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "checkSum"), Napi::Function::New(env, NODECRC16CheckSum));
    exports.Set(Napi::String::New(env, "verifySum"), Napi::Function::New(env, NODECRC16VerifySum));
    return exports;
}

NODE_API_MODULE(crc16, Init)
