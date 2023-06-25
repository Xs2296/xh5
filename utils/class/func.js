function emailCheck(emailAddr) {
	if ((emailAddr == null) || (emailAddr.length < 2)) return false;
	var aPos = emailAddr.indexOf("@", 1);
	if (aPos < 0) {
		return false;
	}
	if (emailAddr.indexOf(".", aPos + 2) < 0) {
		return false;
	}
	return true;
}


export default {
    emailCheck
}