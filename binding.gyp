{
    "targets": [{
        "target_name": "crc16",
        "sources": ["./src/crc16_node.cc"]
    }]
    , "cflags": ["-Wall", "-O3", "-std=c++11"]
    , "xcode_settings": {
        'OTHER_CFLAGS': ['-std=c++11'],
    }
    , "msvs_settings": {
        'VCCLCompilerTool': {
            'ExceptionHandling': 1  # /EHsc
        }
    }
    , 'configurations': {
        'Release': {
            'msvs_settings': {
                'VCCLCompilerTool': {
                    'ExceptionHandling': 1,
                }
            }
        }
    }
    , "conditions": [[
        'OS=="mac"', {
            "xcode_settings": {
                'MACOSX_DEPLOYMENT_TARGET': '10.5'
            }
        }
    ]]
}
