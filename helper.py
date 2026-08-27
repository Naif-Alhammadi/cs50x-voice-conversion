from flask import redirect, session
from functools import wraps


def login_required(f):
    """ Decorate routes to require login. """
    @wraps(f)
    def decorate(*args, **kargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kargs)

    return decorate


class File:
    def __init__(self, path):
        self.path = path
        self.fileFormat = True
        self.isRIFF = False
        self.isWAVE = False
        self.subChunkSize = 0
        self.audioFormat = 'PCM'
        self.numChannels = 'stereo'
        self.sampleRate = 0
        self.file_open()

    def file_open(self):
        with open(self.path, 'rb') as file:

            # read file if it contain RIFF and WAVE signature

            # read by 4 byte
            chunkSize = 4

            while True:

                file_chunk = file.read(chunkSize)

                # if first 4 byte is RIFF IMB stander format
                if (file_chunk == b'RIFF'):
                    self.isRIFF = True
                    continue

                # second 4 byte is WAVE standard .wav files
                if(file_chunk == b'WAVE'):
                    self.isWAVE = True
                    continue

                if(file_chunk == b'fmt '):
                    chunkSize = chunkSize
                    self.subChunkSize = file.read(chunkSize)
                    self.audioFormat = file.read(chunkSize - 2)
                    if self.audioFormat == b'\x01\x00':
                        self.audioFormat = 'PCM'

                    stereo = file.read(chunkSize - 2)
                    if stereo == b'\x02\x00':
                        pass

                    self.sampleRate = self.decimalToHex(file.read(chunkSize))

                    break

                self.fileFormat = False


    def decimalToHex(self, decimal):
        """"Take decimal values and convert (return) them to hexdecimal values"""
        # hexdecimal base
        hex = 16

        # final hexdecimal value after taking it from the list
        hexValue = ''

        # to keep every reminder of a number
        reminder = []
        for i in range(0 , len(decimal)):

            # to keep track of the current number in the list
            result = decimal[i]

            # keep dividing until division reaches 0
            while result != 0:

                # value of base 16
                num = result % hex

                # insert that value to the beginning for the sampleRate
                reminder.insert(0, self.hexLetters(num))

                # update the result division
                result = result // hex

        # for each hex in reminder
        for num in reminder:

            # append hex value in one string
            hexValue = hexValue + str(num)

        # return the value in base 16th
        return int(hexValue, hex)

    def hexLetters(self, num):
        """""Convert the number to its appropriate hexdecimal value"""
        match num:
            case 15:
                num = 'f'
                return num
            case 14:
                num = 'e'
                return num
            case 13:
                num = 'd'
                return num
            case 12:
                num = 'c'
                return num
            case 11:
                num = 'b'
                return num
            case 10:
                num = 'a'
                return num
            case _:
                return num

if __name__ == "__main__":
    f = File("uploads/audios/lack in.wav")