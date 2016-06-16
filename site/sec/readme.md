# generate public pgp key

```
gpg --gen-key
gpg --armor --export ja
```

On Windows you can copy to output to the clipboard with
`gpg --armor --export ja | clip` to export key *ja*.


## Windows line endings

If you copy the encrypted content from your browser's console on Windows,
you get wrong line endings (CRLF instead of LF). Wrong in the sense
that `gpg -d [your output file]`, where *your output file* has the content
you copied, will fail because of the line endings. In the case of visual
studio code, you can delete every second line.


## cheat sheet


**to export a public key into file public.key:**

`gpg --export -a "User Name" > public.key`

This will create a file called public.key with the ascii representation
of the public key for User Name. This is a variation on:

`gpg --export`

which by itself is basically going to print out a bunch of crap
to your screen. I recommend against doing this.

`gpg --export -a "User Name"`

prints out the public key for User Name to the command line,
which is only semi-useful


**to export a private key:**

`gpg --export-secret-key -a "User Name" > private.key`
This will create a file called private.key with the ascii representation
of the private key for User Name. It's pretty much like exporting a
public key, but you have to override some default protections. There's
a note (*) at the bottom explaining why you may want to do this.

**to import a public key:**

`gpg --import public.key`

This adds the public key in the file "public.key" to your public key ring.