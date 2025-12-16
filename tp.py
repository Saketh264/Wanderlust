nums = [10, 5, 2, 7, 1]
val=5
count=0
class Node:
    def __init__(self,data,next=None):
        self.data=data
        self.next=next
head=Node(nums[0])
mover=head
for i in range(1,len(nums)):
    x=Node(nums[i])
    mover.next=x
    mover=x
temp=head
# while temp:
#     print(temp.data,end="-->")
#     temp=temp.next
#     count+=1
# print("None")
# print(f"length is : ",count)
while temp:
    if(temp.data==val):
        print("found", {count})
        break
    temp=temp.next
    count+=1
print("Not found")
    