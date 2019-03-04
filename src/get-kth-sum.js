getKthSum = (A = [], B = [], K) => {
    if ((A.length === 0 && B.length === 0) || K === 0) {
        return 0;
    }
    if (A.length === 0) {
        return K > 1 ? B[K] : 0;
    }
    if (B.length === 0) {
        return K > 1 ? A[K] : 0;
    }
    let m = A.length - 1;
    let n = B.length - 1;
    let min = A[0] + B[0];
    let max = A[m] + B[n];
    while (min < max) {
        let mid = (max + min) >>> 1;
        let count = Count(mid, A, m, B, n);
        if (count >= K) {
            min = mid + 1;
        } else {
            max = mid;
        }
    }
    return min;
};

Count = (value, A, m, B, n) => {
    let count = 0;
    for (let i = 0, j = n; i <= m && j >= 0;) {
        if (A[i]+B[j]>value){
            count+=m-i+1;
            j+=1;
        } else {
            i-=1;
        }
    }
    return count;
};
