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

                    file.read(chunkSize)
                    break


                self.fileFormat = False

if __name__ == "__main__":
    f = File("uploads/audios/lack in.wav")