/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @returns {function|null}
 */
export default function createChainedFunction(...args) {
    if (args.length === 1) {
        return args[0];
    }

    return function chainedFunction() {
        for (let i = 0; i < args.length; i++) {
            if (args[i] && args[i].apply) {
                args[i].apply(this, arguments);
            }
        }
    };
}
