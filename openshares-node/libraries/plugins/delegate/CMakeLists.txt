file(GLOB HEADERS "include/capricorn/delegate/*.hpp")

add_library( capricorn_delegate 
             delegate.cpp
           )

target_link_libraries( capricorn_delegate capricorn_chain capricorn_app capricorn_time )
target_include_directories( capricorn_delegate
                            PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include" )

install( TARGETS
   capricorn_delegate

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
