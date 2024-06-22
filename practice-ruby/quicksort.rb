def partition(array, low, high)

  # Choose the rightmost element as pivot
  pivot = array[high]

  # Pointer for greater element
  i = low - 1

  # Traverse through all elements
  # compare each element with pivot
  j = low
  while j < high
    if array[j] <= pivot

      # If element smaller than pivot is found
      # swap it with the greater element pointed by i
      i = i + 1

      # Swapping element at i with element at j
      array[i], array[j] = array[j], array[i]
    end
    # Swap the pivot element with
    # the greater element specified by i
    array[i + 1], array[high] = array[high], array[i + 1]
    j +=1
  end
  # Return the position from where partition is done
  return i + 1
end

# Function to perform quicksort
def quicksort(array, low, high)
  if low < high
    # Find pivot element such that
    # element smaller than pivot are on the left
    # element greater than pivot are on the right
    pi = partition(array, low, high)

    # Recursive call on the left of pivot
    quicksort(array, low, pi - 1)

    # Recursive call on the right of pivot
    quicksort(array, pi + 1, high)
  end
end


array = [10, 7, 8, 9, 1, 5]
N = array.length

# Function call
quicksort(array, 0, N - 1)
puts 'Sorted array:'
array.each {|x| pp x}