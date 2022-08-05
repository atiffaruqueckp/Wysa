# Wysa
My solution to the assessment REST apis [link to md file]

https://github.com/atiffaruqueckp/Wysa.git


My leetcode challenge [link to md file]

https://leetcode.com/submissions/detail/765617816/

/*var isValidBST = function(root) {
    // console.log(root)
    // console.log(root.val)
    // console.log(root.left)
    // console.log(root.right)
    return depthFirstSearch(root , -Infinity , +Infinity)
    
};

var isValidBST = function(root) {
    function recurse(root,min,max){
        //base case
        if(root === null){
            return true;
        }
        if((root.val >= max || root.val <= min)){
            return false;
        }
        //recurrence relation
        return recurse(root.left,min,root.val) && recurse(root.right, root.val, max);
        
    }
    return recurse(root,-Infinity, Infinity)
};*/