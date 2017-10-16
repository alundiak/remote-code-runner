POST JavaScript code
```
https://leetcode.com/contest/api/leetcode-weekly-contest-54/problems/degree-of-an-array/interpret_solution/
```

Request
```
{
    "question_id": "697",
    "data_input": "[1,2,2,3,1]",
    "lang": "javascript",
    "typed_code": "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar findShortestSubArray = function(nums) {\n    var winner = [];\n    // winner[nums[0]] = 0;\n    // var j = 0;\n    \n    // for (var i=1; i<nums.length; i++){\n    //     winner[nums[i]] = winner[nums[i]] ? winner[nums[i]]++ :++j;\n    // }\n    \n    nums.forEach(function(elem, index, arr){\n        winner[elem] += 1;\n    })\n    \n    var realWinner = winner.find(function(elem){\n        return elem\n    })\n    return nums;\n};",
    "test_mode": false,
    "judge_type": "large"
}
```

GET
```
https://leetcode.com/submissions/detail/interpret_expected_1508178515.95_926631_1/check/
```
Response:
```
{
    "code_answer": ["2"],
    "code_output": [],
    "status_code": 10,
    "status_runtime": "0 ms",
    "run_success": true,
    "state": "SUCCESS",
    "total_correct": null,
    "display_runtime": "",
    "total_testcases": null
}
```

```
{
    "code_answer": ["[1,2,2,3,1]"],
    "code_output": [],
    "status_code": 10,
    "status_runtime": "98 ms",
    "run_success": true,
    "state": "SUCCESS",
    "total_correct": null,
    "display_runtime": "",
    "total_testcases": null
}
```



POST Java code
```
https://leetcode.com/contest/api/leetcode-weekly-contest-54/problems/partition-to-k-equal-sum-subsets/interpret_solution/
```

```
{
    "question_id": "698",
    "data_input": "[4,3,2,3,5,2,1]\n4",
    "lang": "java",
    "typed_code": "class Solution {\n    public boolean canPartitionKSubsets(int[] nums, int k) {\n        \n    }\n}",
    "test_mode": false,
    "judge_type": "large"
}
```
