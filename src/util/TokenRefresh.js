
// receives time in milliseconds
export default function isExpired(expiration) {
    return expiration <= new Date().getTime();
}