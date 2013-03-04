GroupEdit
=========

I was interviewing new grads last week and CollabEdit was acting really slow.  I decided to try building my own to get a sense of the technical challenges required.  I might even ask you how to build such a site if I end up interviewing you ;).  This code is by no means production worthy - just barely enough to really understand and appreciate the problems that would result when scaling to 1-10-100k concurrent users.

To run:
- Install dependencies: npm install
- Start a redis server with all defaults (should drop a dump.db file in the directory you start it)
- Run the node script: node main.js


