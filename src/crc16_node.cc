#include <node.h>
#include <node_buffer.h>

#include "./../lib/crc16.cc"

using namespace node;
using namespace v8;

uint8_t *BufferData(v8::Local<v8::Value> buf_val)
{
    return (uint8_t *)node::Buffer::Data(buf_val);
}
size_t BufferLength(v8::Local<v8::Value> buf_val)
{
    return node::Buffer::Length(buf_val);
}

void CRC16CheckSum(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (!args[0]->IsObject())
    {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Input Stream is Buffer required!")));
    }

    Handle<Value> stream = Handle<Value>::Cast(args[0]);
    Handle<Object> option = Handle<Object>::Cast(args[1]);

    bool bIsGetArry = false;
    Local<String> getArryKey = String::NewFromUtf8(isolate, "getArry");
    if (option->Has(getArryKey))
    {
        Handle<Value> isGetArry = option->Get(getArryKey);
        bIsGetArry = isGetArry->BooleanValue();
    }

    uint8_t *bytes = BufferData(stream);
    size_t len = BufferLength(stream);
    if(len <= 0){
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Stream buffer can't be empty!")));
    }

    if (bIsGetArry)
    {
        uint8_t sumArry[2];
        CRC16CheckSum(bytes, len, sumArry);

        v8::Local<Array> sumForReturn = v8::Array::New(isolate);
        sumForReturn->Set(0, v8::Number::New(isolate, sumArry[0]));
        sumForReturn->Set(1, v8::Number::New(isolate, sumArry[1]));

        args.GetReturnValue().Set(sumForReturn);
    }
    else
    {
        char *sumStr = CRC16CheckSum(bytes, len);
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, sumStr));
    }
}
void CRC16VerifySum(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (!args[0]->IsObject())
    {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Input Stream is Buffer required!")));
    }

    Handle<Value> stream = Handle<Value>::Cast(args[0]);
    uint8_t *bytes = BufferData(stream);
    size_t len = BufferLength(stream);
    if(len <= 0){
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Stream buffer can't be empty!")));
    }

    bool isValid = false;
    isValid = CRC16VerifySum(bytes, len);

    args.GetReturnValue().Set(Boolean::New(isolate, isValid));
}

void init(Local<Object> exports)
{
    NODE_SET_METHOD(exports, "checkSum", CRC16CheckSum);
    NODE_SET_METHOD(exports, "verifySum", CRC16VerifySum);
}

NODE_MODULE(crc16, init)
