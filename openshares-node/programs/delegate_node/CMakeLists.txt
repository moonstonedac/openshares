add_executable( delegate_node main.cpp )
if( UNIX AND NOT APPLE )
  set(rt_library rt )
endif()

find_package( Gperftools QUIET )
if( GPERFTOOLS_FOUND )
    message( STATUS "Found gperftools; compiling delegate_node with TCMalloc")
    list( APPEND PLATFORM_SPECIFIC_LIBS tcmalloc )
endif()

# We have to link against capricorn_debug_delegate because deficiency in our API infrastructure doesn't allow plugins to be fully abstracted #246
target_link_libraries( delegate_node
                       PRIVATE capricorn_app capricorn_account_history capricorn_market_history capricorn_delegate capricorn_chain capricorn_debug_delegate capricorn_egenesis_full fc ${CMAKE_DL_LIBS} ${PLATFORM_SPECIFIC_LIBS} )

install( TARGETS
   delegate_node

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
