/**
 * For simplicity, there is no params validation check,
 * becuase this util function is only used here .
 * Also, I suppose that versionA and versionB are valid semver string .
 */
function isLargerOrEqual(versionA, versionB) {
  if (versionA === versionB)
    return true;

  var ver1 = versionA.split('.');
  var ver2 = versionB.split('.');

  var len = ver1.length;
  for (var i = 0; i < len; i++) {
    if (ver1[i] > ver2[i])
      return true;
    if (ver1[i] < ver2[i])
      return false;
  }
}

if (isLargerOrEqual(process.version, 'v12.0.0')) {
  console.error('\033[1;31m' + `
    now your node version is larger than or equal to v12.0.0, 
    please use node-crc16@2 instead.
`
  );
  process.exit(1)
}