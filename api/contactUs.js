import Serve from '@/api/serve'
class ContactUs {
    static contactUs(data) {
        return Serve.post(`/contactUs`, data);
    }
	static contact () {
	    return Serve.get(`/index/contact`);
	}
}
export default ContactUs;