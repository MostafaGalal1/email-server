class FileService {

    types = new Map();

    setTypes() {
        this.types.set('pdf', 'application/pdf')
        this.types.set('xls', 'application/vnd.ms-excel')
        this.types.set('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        this.types.set('txt', 'text/plain')
        this.types.set('doc', 'application/msword')
        this.types.set('7z', 'application/x-7z-compressed')
        this.types.set('docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        this.types.set('css', 'text/css')
        this.types.set('epub', 'application/epub+zip')
        this.types.set('htm', 'text/html')
        this.types.set('wav', 'audio/wav')
        this.types.set('html', 'text/html')
        this.types.set('ppt', 'application/vnd.ms-powerpoint')
        this.types.set('rar', 'application/vnd.rar')
        this.types.set('pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
        this.types.set('ico', 'image/vnd.microsoft.icon')
        this.types.set('gif', 'image/gif')
        this.types.set('png', 'image/png')
        this.types.set('zip', 'application/zip')
        this.types.set('js', 'text/javascript')
        this.types.set('mp3', 'audio/mpeg')
        this.types.set('json', 'application/json')
        this.types.set('jar', 'application/java-archive')
        this.types.set('jpeg', 'image/jpeg')
        this.types.set('jpg', 'image/jpeg')
        this.types.set('csv', 'text/csv')
        this.types.set('aac', 'audio/aac')
        this.types.set('arc', 'application/x-freearc')
        this.types.set('avi', 'video/x-msvideo')
        this.types.set('azw', 'application/vnd.amazon.ebook')
        this.types.set('bmp', 'image/bmp')
        this.types.set('bz', 'application/x-bzip')
        this.types.set('eot', 'application/vnd.ms-fontobject')
        this.types.set('ics', 'text/calendar')
        this.types.set('jsonld', 'application/ld+json')
        this.types.set('mid', 'audio/midi')
        this.types.set('midi', 'audio/midi')
        this.types.set('mjs', 'text/javascript')
        this.types.set('mpeg', 'video/mpeg')
        this.types.set('mpkg', 'application/vnd.apple.installer+xml')
        this.types.set('php', 'application/x-httpd-php')
        this.types.set('rtf', 'application/rtf')
        this.types.set('svg', 'image/svg+xml')
        this.types.set('vsd', 'application/vnd.visio')
        this.types.set('weba', 'audio/webm')
        this.types.set('xhtml', 'application/xhtml+xml')
        this.types.set('xml', 'application/xml')
        this.types.set('odp', 'application/vnd.oasis.opendocument.presentation')
        this.types.set('ods', 'application/vnd.oasis.opendocument.spreadsheet')
        this.types.set('odt', 'application/vnd.oasis.opendocument.text')
        this.types.set('oga', 'audio/ogg')
        this.types.set('ogv', 'video/ogg')
        this.types.set('ogx', 'application/ogg')
        this.types.set('opus', 'audio/opus')
        this.types.set('otf', 'font/otf')
    }

    saveByteArray(fileName, byte) {
        byte = this.base64ToArrayBuffer(byte);
        let ext = this.getExtension(fileName)
        let mimeType = this.getType(ext)
        let blob = new Blob([byte], {type: mimeType});
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }

    getExtension(fileName) {
        let regexFileExtension = /(\w+)$/; // match file extension
        return fileName.match(regexFileExtension);
    }

    getType(ext) {
        this.setTypes()
        if (this.types.has(ext))
            return this.types.get(ext);
        else
            return 'application/octet-stream'
    }


    base64ToArrayBuffer(base64) {
        let binaryString = window.atob(base64);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
}

export default new FileService();
