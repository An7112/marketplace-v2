import {create} from 'ipfs-http-client'
import { Buffer } from 'buffer';

const projectId = '2FA8P7z5rEdsftDl27qciI4ZZlC';
const projectSecret = '9b0b97567bbbf4aeb81107c4c7786367';
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const ApiResponeSwiper = "http://localhost:9000/api/swiper"
export const ApiResponeCollection = "http://localhost:9000/api/data"