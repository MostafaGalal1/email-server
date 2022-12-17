import axios from "axios";
const API_URL = "http://localhost:9000/api/";
class EmailService {

  /**
   * @param emailID to be fetched
   * @returns success flag
   */
  getMail(emailID,key) {
    console.log(emailID);
    return axios.get(API_URL + "getMail", {
          params:{
            id: emailID,
            key: key
          }
        });
  }

  /**
   * @param formdata to be sent
   * @returns success flag
   */
  sendMail(formData) {
    return axios.post(API_URL + "sendMail", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  }

  /**
   * @param folderIndex to be get email headers from
   * @param page to be fetched
   * @param sortingCriteria to sort by
   * @returns response with email headers
   */
  getMailHeaders(folderIndex, page, sortingCriteria, order,key) {
    return axios.get(API_URL + "loadMailHeaders", {
        params:{
          folderIndex: folderIndex,
          page: page,
          criteria: sortingCriteria,
          order: order,
          key:  key
        },
    });
  }

  /**
   * @param folderIndex to be get email headers from
   * @param page to be fetched
   * @param filteringCriteria to filter by
   * @returns response with email headers
   */
  getFilteredMailHeaders(folderIndex, page, filteringCriteria, filteringKey,key) {
    if (filteringCriteria == 'Date') {
      filteringKey = filteringKey.split("-").reverse().join("/")
    }
    return axios.get(API_URL + "filterMailHeaders", {
        params:{
          folderIndex: folderIndex,
          page: page,
          criteria: filteringCriteria,
          filterKey: filteringKey,
            key: key
        }
    });
  }


  /**
   * @param selectedHeaders to be copied
   * @param sourceFolder of the headers
   * @param destinationFolder of the headers
   * @returns response with email headers
   */
  copyMails(selectedHeaders, currentFolder, destinationFolder,key) {
    return axios.put(API_URL + "copyMail", null, {
        params:{
          headersId: selectedHeaders+'',
          currentFolder: currentFolder,
          destinationFolder: destinationFolder,
            key: key
        }
    });
  }

  /**
   * @param selectedHeaders to be moved
   * @param sourceFolder of the headers
   * @param destinationFolder of the headers
   * @returns response with email headers
   */
  moveMails(selectedHeaders, currentFolder, destinationFolder,key) {
    return axios.put(API_URL + "moveMail", null, {
        params:{
          headersId: selectedHeaders+'',
          currentFolder: currentFolder,
          destinationFolder: destinationFolder,
            key :key
        }
    });
  }

  /**
   * @param selectedHeaders to be deleted
   * @param sourceFolder of the headers
   * @param destinationFolder of the headers
   * @returns response with email headers
   */
  deleteMails(selectedHeaders, currentFolder,key) {
    return axios.delete(API_URL + "deleteMail", {
        params:{
          headersId: selectedHeaders+'',
          currentFolder: currentFolder,
            key: key
        }
    });
  }

  sendDraft(formData) {
    console.log(formData);
    return axios.post(API_URL + "drafts", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
  }

  dumpRetrieve() {
    return axios.get(API_URL + "dumpRetrieve");
  }
}
export default new EmailService();
